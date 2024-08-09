package models

type Note struct {
	ID      int
	Title   string
	Tag     []string
	Content string
}

type NoteList struct {
	ID    int
	Title string
	Tag   []string
}
