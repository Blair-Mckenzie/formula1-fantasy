package handlers

import (
	"net/http"
	"root/internal/repositories"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
)

func GetDrivers(client *firestore.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		drivers, err := repositories.GetAllDrivers(client)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch drivers"})
			return
		}
		c.JSON(http.StatusOK, drivers)
	}
}

func GetDriver(client *firestore.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		driverId := c.Param("driverId")

		driver, err := repositories.GetDriverById(client, driverId)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Driver not found"})
			return
		}

		c.JSON(http.StatusOK, driver)
	}
}