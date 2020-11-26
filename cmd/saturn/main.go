package main

import (
	"context"
	log "github.com/sirupsen/logrus"
	"github.com/xamber/saturn/internal/database"
	"github.com/xamber/saturn/internal/entity"
	"github.com/xamber/saturn/internal/opml"
	"github.com/xamber/saturn/internal/parser"
	"github.com/xamber/saturn/internal/web"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
	"time"
)

const postgresAddr = "postgres:5432"
const postgresUser = "postgres"
const postgresPassword = "postgres"
const postgresDB = "postgres"

func main() {
	var sources []entity.Source

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	stopChannel := make(chan os.Signal, 1)
	signal.Notify(stopChannel, syscall.SIGTERM)
	signal.Notify(stopChannel, syscall.SIGINT)

	articles := make(chan entity.Article)

	time.Sleep(5 * time.Second)

	database.Connect(postgresAddr, postgresUser, postgresPassword, postgresDB)

	err := database.CreateTables()
	if err != nil {
		log.Fatal(err)
	}

	currentDir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	feedsPath := filepath.Join(currentDir, "feeds.opml")
	sources = opml.FromFile(feedsPath)

	err = database.CompleteSourcesList(sources)
	if err != nil {
		log.Fatal(err)
	}

	sources, err = database.GetAllSources()
	if err != nil {
		log.Fatal(err)
	}

	parser.Manager(ctx, sources, articles)

	go web.Serve(ctx)

	for {
		select {
		case <-ctx.Done():
			log.Println("Waiting for graceful stop..")
			time.Sleep(3 * time.Second)
			return
		case <-stopChannel:
			log.Println("Application was interapted by user")
			go database.Disconnect()
			go cancel()
		}
	}
}
