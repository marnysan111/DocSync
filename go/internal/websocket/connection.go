package websocket

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/marnysan111/docsync/internal/models"
)

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // すべてのオリジンを許可
	},
}

func ConnHandler(ctx *gin.Context, i string) {
	conn, err := wsupgrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		log.Printf("Failed to set websocket upgrade: %+v\n", err)
		return
	}
	models.Clients[conn] = true
	for {
		t, msg, err := conn.ReadMessage()
		if err != nil {
			log.Printf("ReadMessage Error. ERROR: %+v\n", err)
			break
		}
		// 受け取ったメッセージをbroadcastを通じてhandleMessages()関数へ渡す
		models.Broadcast <- models.Message{Type: t, Message: msg}
	}
}
