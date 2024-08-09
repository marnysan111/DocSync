package notes

import (
	"fmt"
	"os"
	"strings"

	"github.com/marnysan111/docsync/internal/models"
)

var notes []models.Note
var dir = "/usr/docs"

func InitNotes() {
	files, err := os.ReadDir(dir)
	if err != nil {
		fmt.Println("Failed to read directory:", err)
		return
	}

	for i, file := range files {
		if !file.IsDir() && strings.HasSuffix(file.Name(), ".md") {
			content, _ := os.ReadFile(dir + "/" + file.Name())
			note := models.Note{
				ID:      i,
				Title:   file.Name(),
				Tag:     []string{},
				Content: string(content),
			}
			notes = append(notes, note)
		}
	}
}

func GetNoteList() []*models.NoteList {
	var summaries []*models.NoteList
	for _, note := range notes {
		summary := &models.NoteList{
			ID:    note.ID,
			Title: note.Title,
			Tag:   note.Tag,
		}
		summaries = append(summaries, summary)
	}
	return summaries
}

func GetNoteByID(id int) (*models.Note, bool) {
	for _, note := range notes {
		content, _ := os.ReadFile(dir + "/" + note.Title)
		if note.ID == id {
			note.Content = string(content)
			return &note, true
		}
	}
	return nil, false
}
