package parser

import (
	"context"
	"github.com/mmcdole/gofeed"
	log "github.com/sirupsen/logrus"
	"github.com/xamber/saturn/internal/database"
	"github.com/xamber/saturn/internal/entity"
	"time"
)

var feeder *gofeed.Parser

func Manager(ctx context.Context, sources []entity.Source, output chan entity.Article) {
	log.Info("Parser manager is starting..")

	feeder = gofeed.NewParser()
	log.Info("Gofeed parser created")

	for _, source := range sources {
		go RunParser(ctx, source, output)
	}

	go Updater(ctx, output)

	log.Info("All workers were started")
}

func Updater(ctx context.Context, parsed <-chan entity.Article) {
	log.Info("Parser manager is started")

	for {
		select {
		case <-ctx.Done():
			return
		case article := <-parsed:
			err := database.InsertArticle(article)
			if err != nil {
				log.Error(err)
			} else {
				log.WithField("Article", article.Title).Info("Article was handled by manager")
			}
		}
	}
}

func RunParser(ctx context.Context, source entity.Source, output chan<- entity.Article) {
	feedLogger := log.WithField("Feed", source.RSS)

	updated := time.Now().Add(-time.Second * 3600 * 24 * 15)
	timeout := time.Second * 60 * 1

	ticker := time.NewTicker(timeout)

	feedLogger.Info("Parsing is started")
	var errCount int = 0

	for {
		articles, err := parse(source, updated)
		if err != nil {
			errCount++
			log.Debug(err)
		}
		if errCount > 3 {
			log.Error(err)
			break
		}

		for _, article := range articles {
			output <- article
			if article.Data.After(updated.Add(time.Second)) {
				updated = article.Data
			}
		}
		feedLogger.WithField("Next", time.Now().Add(timeout)).Debug("Sleep till the next tick")

		select {
		case <-ctx.Done():
			feedLogger.Info("Stop signal received. Stopping...")
			return
		case <-ticker.C:
			feedLogger.WithField("Last updated", updated).Debug("Fetching new articles")
		}
	}
	feedLogger.Info("Parsing is stopped")
}

func GetAdditionalInformation(article entity.Article) entity.Article {
	if article.Link != "" {
		article.Icon = "https://www.google.com/s2/favicons?domain=" + article.Link
	} else {
		article.Icon = "https://www.google.com/s2/favicons?domain=" + article.Source.WebSite
	}
	//g := goose.New()
	//
	//if article.Link == "" {
	//	goosed, err := g.ExtractFromURL(source.Site)
	//	if err != nil {
	//		article.Icon = goosed.MetaFavicon
	//	}
	//	return article
	//}
	//
	//goosed, err := g.ExtractFromURL(article.Link)
	//
	//if err == nil {
	//	article.Icon = goosed.MetaFavicon
	//	article.Image = goosed.TopImage
	//	article.Text = goosed.CleanedText
	//}
	return article
}

func parse(source entity.Source, updated time.Time) ([]entity.Article, error) {
	var parserArticles []entity.Article

	feedLogger := log.WithField("Feed", source.RSS)
	feed, err := feeder.ParseURL(source.RSS)

	if err != nil {
		feedLogger.Error(err)
		return parserArticles, err
	}

	feedLogger.Debug("RSS url was fetched")

	for _, item := range feed.Items {
		if item.PublishedParsed.Before(updated.Add(time.Second)) {
			feedLogger.Debug("Reached already parsed news.")
			break
		}

		article := entity.Article{
			Title: item.Title,
			Link:  item.Link,
			Data:  *item.PublishedParsed,
			Source: &source,
			SourceID: source.Id,
			Icon:  source.Icon,
		}

		article = GetAdditionalInformation(article)

		parserArticles = append(parserArticles, article)
		feedLogger.WithField("Title", article.Title).Info("Parsed")
	}
	return parserArticles, nil
}
