package database

import (
	log "github.com/sirupsen/logrus"
	"github.com/xamber/saturn/internal/entity"
)

func CompleteSourcesList(sources []entity.Source) error {
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

	log.WithField("source", source.Name).Info("New source added")
	return err
}

func GetAllSources() (sources []entity.Source, err error) {
	err = Database.Model(&sources).Select()
	return sources, err
}

func GetSourcesByGroup(group string) (sources []entity.Source, err error) {
	err = Database.Model(&sources).Where("source.group = ?", group).Order("name DESC").Select()
	return sources, nil
}
