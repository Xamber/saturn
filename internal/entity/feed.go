package entity

import "time"

type Source struct {
	Id int

	Name string
	RSS  string `pg:",unique"`
	WebSite string

	Group string

	Icon string // todo remove it and use the func

	Articles []*Article // has many relation
}

type Article struct {
	Id int

	Title string `pg:"unique:book_id_lang"`
	Link  string `pg:"unique:book_id_lang"`
	Data time.Time

	SourceID  int
	Source    *Source

	// Additional information
	Icon string
	Image string
	Text  string
}
