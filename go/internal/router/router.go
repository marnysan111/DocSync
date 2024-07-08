package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/marnysan111/docsync/internal/models"
	"github.com/marnysan111/docsync/internal/websocket"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))
	api := r.Group("/api")
	api.GET("", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"result":  "success",
			"message": "pong",
		})
	})
	api.GET("/notes", func(c *gin.Context) {
		var notes []models.Note
		notes = append(notes, models.Note{ID: 1, Title: "Sample Title", Tag: []string{"python"}})
		notes = append(notes, models.Note{ID: 2, Title: "Sample Title2", Tag: []string{"go", "golang"}})
		c.JSON(200, gin.H{
			"result":  "success",
			"message": "pong",
			"data":    notes,
		})
	})

	api.GET("/note/:id", func(c *gin.Context) {
		var notes models.Note
		id := c.Param("id")
		if id == "1" {
			notes = models.Note{ID: 1, Title: "Sample Title", Tag: []string{"python"}}
		} else {
			notes = models.Note{ID: 2, Title: "Sample Title2", Tag: []string{"go", "golang"}}
		}
		c.JSON(200, gin.H{
			"result":  "success",
			"message": "pong",
			"data":    notes,
		})
	})

	r.GET("/ws", func(c *gin.Context) {
		websocket.ConnHandler(c)
	})
	return r
}
