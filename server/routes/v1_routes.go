package routes

import (
	"github.com/gin-gonic/gin"
	"cloud.google.com/go/firestore"
	"root/internal/handlers"
)

func SetupV1Routes(router *gin.RouterGroup, client *firestore.Client) {
	v1 := router.Group("/v1")
	{
		f1 := v1.Group("/formula1")
		{
			f1.GET("/races", handlers.Races(client))
			f1.GET("/races/:raceId", handlers.GetRace(client))
		}
	}
}