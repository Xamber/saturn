package main

import (
	"context"
	log "github.com/sirupsen/logrus"
	"github.com/xamber/saturn/internal/database"
	"github.com/xamber/saturn/internal/entity"
	"github.com/xamber/saturn/internal/opml-parser"
	"github.com/xamber/saturn/internal/parser"
	"github.com/xamber/saturn/internal/web"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
	"time"
)

func main() {
	var sources []entity.Source

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	stopChannel := make(chan os.Signal, 1)
	signal.Notify(stopChannel, syscall.SIGTERM)
	signal.Notify(stopChannel, syscall.SIGINT)

	articles := make(chan entity.Article)

	time.Sleep(4 * time.Second)

	database.Connect("postgres:5432", "postgres", "postgres", "postgres")

	err := database.CreateTables()
	if err != nil {
		log.Error(err)
		os.Exit(1)
	}

	currentDir, err := os.Getwd()
	feedsPath := filepath.Join(currentDir, "feeds.opml")

	sources = opml_parser.GetSourcesFromFile(feedsPath)
	err = database.CompleteSourcesList(sources)
	if err != nil {
		log.Error(err)
		os.Exit(1)
	}

	sources, err = database.GetAllSources()
	if err != nil {
		log.Error(err)
		os.Exit(1)
	}
	parser.Manager(ctx, sources, articles)

	go web.Serve(ctx)

	for {
		select {
		case <-ctx.Done():
			log.Println("Trying to make graceful stop..")
			time.Sleep(3 * time.Second)
			return
		case <-stopChannel:
			log.Println("Stopping the context")
			go database.Disconnect()
			go cancel()
		}
	}
}
