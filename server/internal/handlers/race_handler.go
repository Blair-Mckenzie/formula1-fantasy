package handlers

import (
	"net/http"
	"root/internal/repositories"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
)

func GetRaces(client *firestore.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		races, err := repositories.GetAllRaces(client)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch races"})
			return
		}
		c.JSON(http.StatusOK, races)
	}
}

func GetRace(client *firestore.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		raceId := c.Param("raceId")

		race, err := repositories.GetRaceByID(client, raceId)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Race not found"})
			return
		}

		c.JSON(http.StatusOK, race)
	}
}