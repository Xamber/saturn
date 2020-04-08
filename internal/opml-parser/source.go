package opml_parser

import (
	log "github.com/sirupsen/logrus"
	"github.com/xamber/saturn/internal/entity"
)

func GetSourcesFromFile(feedsPath string) []entity.Source {
	var sources []entity.Source

	logger := log.WithField("file", feedsPath)
	logger.Info("Starting parsing feeds opml file.")

	file, err := NewOPMLFromFile(feedsPath)
	if err != nil {
		log.Error(err)
	}
	for _, group := range file.Outlines() {
		for _, rss := range group.Outlines {
			sources = append(sources, entity.Source{
				Name:  rss.Title,
				RSS:   rss.XMLURL,
				WebSite:  rss.HTMLURL,
				Group: group.Title,
			})
			log.WithFields(log.Fields{
				"Name":  rss.Title,
				"RSS":   rss.XMLURL,
				"Site":  rss.HTMLURL,
				"Group": group.Title,
			}).Info("Found new source")
		}
	}

	logger.WithField("count", len(sources)).Info("Parsing was finished.")
	return sources
}
