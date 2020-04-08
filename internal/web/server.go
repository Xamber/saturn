package web

import (
	"context"
	"encoding/json"
	log "github.com/sirupsen/logrus"
	"github.com/xamber/saturn/internal/database"
	"github.com/xamber/saturn/internal/entity"
	"html/template"
	"net/http"
)

func GetBySourceName(w http.ResponseWriter, r *http.Request) {
	logger := log.WithField("Handler", "GetBySourceName")
	logger.Info("Get request handled")

	limit := 50

	name := r.URL.Query().Get("name")

	articles, err := database.GetByName(name, limit)
	if err != nil {
		w.WriteHeader(500)
	}

	err = json.NewEncoder(w).Encode(articles)
	if err != nil {
		w.WriteHeader(500)
	}
}

func GetBySourceGroup(w http.ResponseWriter, r *http.Request) {
	logger := log.WithField("Handler", "GetBySourceName")
	logger.Info("Get request handled")

	limit := 50

	name := r.URL.Query().Get("name")

	articles, err := database.GetByGroup(name, limit)
	if err != nil {
		w.WriteHeader(500)
	}

	err = json.NewEncoder(w).Encode(articles)
	if err != nil {
		w.WriteHeader(500)
	}
}

type IndexData struct {
	Company    []entity.Article
	HackerNews []entity.Article
}

func Index(w http.ResponseWriter, r *http.Request) {
	logger := log.WithField("Handler", "Index")

	tmpl := template.Must(template.ParseFiles("layout.html"))

	complany, err := database.GetByGroup("Компании", 50)
	if err != nil {
		logger.Error(err)
		w.WriteHeader(500)
	}

	hackerNews, err := database.GetByName("Hacker News: Newest", 50)
	if err != nil {
		logger.Error(err)
		w.WriteHeader(500)
	}

	data := IndexData{
		Company:    complany,
		HackerNews: hackerNews,
	}

	err = tmpl.Execute(w, data)
	if err != nil {
		logger.Error(err)
		w.WriteHeader(500)
	}
}

func Serve(ctx context.Context) {
	http.HandleFunc("/", Index)
	http.HandleFunc("/name", GetBySourceName)
	http.HandleFunc("/group", GetBySourceGroup)

	err := http.ListenAndServe(":3000", nil)
	log.Error(err)

	<-ctx.Done()
}
