package database

import "github.com/xamber/saturn/internal/entity"

func InsertArticle(article entity.Article) error {
	_, err := Database.Model(&article).
		Where("title = ?", article.Title).
		Where("link = ?", article.Link).
		OnConflict("DO NOTHING").
		SelectOrInsert(&article)

	return err
}

func GetByGroup(group string, limit int) ([]entity.Article, error) {
	var articles []entity.Article
	err := Database.Model(&articles).Relation("Source").Where("source.group = ?", group).Order("data DESC").Limit(limit).Select()
	if err != nil {
		return articles, err
	}
	return articles, nil
}
