package routes

import (
	"root/internal/handlers"
	"root/internal/middleware"

	"cloud.google.com/go/firestore"
	"firebase.google.com/go/auth"
	"github.com/gin-gonic/gin"
)

func SetupV1Routes(router *gin.RouterGroup, fireStoreClient *firestore.Client, authClient *auth.Client) {
	v1 := router.Group("/v1")
	{
		f1 := v1.Group("/formula1")
		{
			f1.POST("/users", middleware.VerifyFirebaseToken(authClient), handlers.CreateUser(fireStoreClient))
			f1.GET("/races", handlers.GetRaces(fireStoreClient))
			f1.GET("/races/:raceId", handlers.GetRace(fireStoreClient))
			f1.GET("/drivers", handlers.GetDrivers(fireStoreClient))
			f1.GET("/drivers/:driverId", handlers.GetDrivers(fireStoreClient))
			// f1.GET("/predictions/:userId", handlers.GetPredictions(client))
			// f1.GET("/predictions/:userId/:raceId", handlers.GetPredictionByRaceId(client))
			// f1.GET("/predictions/:userId/:id", handlers.GetPredictionById(client))
			// f1.POST("/predictions/:userId/:raceId", handlers.CreatePrediction(client))
			// f1.GET("/standings", handlers.GetStandings(client))
		}
	}
}