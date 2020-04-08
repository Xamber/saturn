package database

import (
	log "github.com/sirupsen/logrus"
	"github.com/xamber/saturn/internal/entity"
)

func ComplainSourceList(sources []entity.Source) error {
	for _, s := range sources {
		err := InsertSource(s)
		if err != nil {
			return err
		}
	}
	return nil
}

func InsertSource(source entity.Source) error {
	_, err := Database.Model(&source).
		Where("rss = ?", source.RSS).
		OnConflict("DO NOTHING").
		SelectOrInsert(&source)

	log.WithField("source", source.Name).Info("Adding new source")
	return err
}

func GetAllSources() ([]entity.Source, error) {
	var sources []entity.Source
	err := Database.Model(&sources).Select()
	return sources, err
}
