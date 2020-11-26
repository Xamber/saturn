package database

import (
	log "github.com/sirupsen/logrus"
	"github.com/xamber/saturn/internal/entity"
)

func CompleteSourcesList(sources []entity.Source) error {
	for _, source := range sources {
		_, err := Database.Model(&source).
			Where("rss = ?", source.RSS).
			OnConflict("DO NOTHING").
			SelectOrInsert(&source)

		if err != nil {
			return err
		}

		log.WithField("source", source.Name).Info("New source added")
	}
	return nil
}

func GetAllSources() (sources []entity.Source, err error) {
	err = Database.Model(&sources).Select()

	return sources, err
}

func GetSourcesByGroup(group string) (sources []entity.Source, err error) {
	err = Database.Model(&sources).Where("source.group = ?", group).Order("name DESC").Select()

	return sources, err
}
