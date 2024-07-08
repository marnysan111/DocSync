package main

import "github.com/marnysan111/docsync/internal/router"

func main() {
	r := router.SetupRouter()
	r.Run()
}
