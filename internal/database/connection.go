package database

import (
	"github.com/go-pg/pg/v9"
	"github.com/go-pg/pg/v9/orm"
	log "github.com/sirupsen/logrus"
	"github.com/xamber/saturn/internal/entity"
)

var Database *pg.DB

func Connect(addr, user, password, database string) {
	Database = pg.Connect(&pg.Options{
		User:     user,
		Password: password,
		Database: database,
		Addr:     addr,
	})
}

func Disconnect() {
	err := Database.Close()
	if err != nil {
		log.Error(err)
	}
}

func CreateTables() error {
	var err error
	var dblogger = log.WithField("database", Database.Options().Addr)

	err = Database.CreateTable(&entity.Article{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return err
	}
	dblogger.Info("Table Article was created")

	err = Database.CreateTable(&entity.Source{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return err
	}
	dblogger.Info("Table Source was created")

	return err
}
