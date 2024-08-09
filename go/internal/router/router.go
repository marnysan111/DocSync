package router

import (
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/marnysan111/docsync/internal/notes"
	"github.com/marnysan111/docsync/internal/websocket"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	notes.InitNotes()
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
		noteList := notes.GetNoteList()
		c.JSON(200, gin.H{
			"result":  "success",
			"message": "pong",
			"data":    noteList,
		})
	})

	api.GET("/note/:id", func(c *gin.Context) {
		i := c.Param("id")
		id, _ := strconv.Atoi(i)
		note, checksum := notes.GetNoteByID(id)
		if !checksum {
			c.JSON(400, gin.H{
				"result": "error",
				"data":   "error",
			})
		}
		c.JSON(200, gin.H{
			"result":  "success",
			"message": "pong",
			"data":    note,
		})
	})

	go websocket.HandleMessage()
	r.GET("/note/:id/ws", func(c *gin.Context) {
		i := c.Param("id")
		websocket.ConnHandler(c, i)
	})
	return r
}
