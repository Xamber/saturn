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
	log.Info("Updater is started")

	for {
		select {
		case <-ctx.Done():
			log.Info("Stop signal received for Updater. Stopping..")
			return
		case article := <-parsed:
			err := database.InsertArticle(article)
			if err != nil {
				log.Error(err)
			} else {
				log.WithField("Article", article.Title).Info("Article was inserted into BD")
			}
		}
	}
}

func RunParser(ctx context.Context, source entity.Source, output chan<- entity.Article) {
	feedLogger := log.WithField("Feed", source.RSS)

	timeout := time.Second * 60 * 3

	ticker := time.NewTicker(timeout)

	feedLogger.Info("Parsing is started")
	var errCount = 0

	for {
		articles, err := parse(source)
		if err != nil {
			errCount++
			log.Error(err)
			if errCount > 10 {
				break
			}
		}

		for _, article := range articles {
			output <- article
		}

		plannedParsingTime := time.Now().Add(timeout)
		feedLogger.WithField("Next", plannedParsingTime).Debug("Sleep until the next tick")

		select {
		case <-ctx.Done():
			feedLogger.Info("Stop signal received. Stopping...")
			return
		case <-ticker.C:
			feedLogger.Debug("Fetching new articles")
		}
	}
	feedLogger.Info("Parsing is stopped")
}

func GetAdditionalInformation(article entity.Article) entity.Article {
	// This code is doing nothing but should be saved for the future.
	return article
}

func parse(source entity.Source) ([]entity.Article, error) {
	var parserArticles []entity.Article

	feedLogger := log.WithField("Feed", source.RSS)
	feed, err := feeder.ParseURL(source.RSS)
	if err != nil {
		feedLogger.Error(err)
		return parserArticles, err
	}

	feedLogger.Debug("RSS url was fetched")

	for _, item := range feed.Items {
		article := entity.Article{
			Title:    item.Title,
			Link:     item.Link,
			Data:     *item.PublishedParsed,
			Source:   &source,
			SourceID: source.Id,
		}

		article = GetAdditionalInformation(article)

		parserArticles = append(parserArticles, article)
		feedLogger.WithField("Title", article.Title).Info("Parsed")
	}
	return parserArticles, nil
}
