package web

import (
	"context"
	"encoding/json"
	log "github.com/sirupsen/logrus"
	"github.com/xamber/saturn/internal/database"
	"net/http"
)

func GetArticlesByTopic(w http.ResponseWriter, r *http.Request) {
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

func Serve(ctx context.Context) {
	http.HandleFunc("/topic", GetArticlesByTopic)

	err := http.ListenAndServe(":3000", nil)
	log.Error(err)

	<-ctx.Done()
}
