package websocket

import (
	"log"

	"github.com/marnysan111/docsync/internal/models"
)

func HandleMessage() {
	for {
		message := <-models.Broadcast
		for client := range models.Clients {
			err := client.WriteMessage(message.Type, message.Message)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(models.Clients, client)
			}
		}
	}
}
