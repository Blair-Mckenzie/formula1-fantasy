package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"root/models"

	"github.com/gin-gonic/gin"
)

func main() {
	os.Setenv("FIRESTORE_EMULATOR_HOST", "localhost:8080")
	client, err := createClient()

	if err != nil {
		log.Printf("Error creating client %v", err)
	}
	races, err := LoadData("races.json")
	if err != nil {
		log.Fatalf("Error loading data %v", err)
	}

	for _, race := range races {
		err := InsertGrandPrix(client, race)
		if err != nil {
			log.Printf("Failed to insert Grand Prix (%s): %v", race.RaceName, err)
		} else {
			fmt.Printf("Inserted: %s\n", race.RaceName)
		}
	}

	router := gin.Default()

	api := router.Group("/api/formula1")
	{
		api.GET("/ping", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"message": "pong"})
		})

		api.GET("/users", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"users": []string{"Test", "AnotherTest"}})
		})
	}

	router.Run(":3000")
}

func LoadData(filename string) ([]models.Race, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var races []models.Race
	if err := json.NewDecoder(file).Decode(&races); err != nil {
		return nil, err
	}

	return races, nil
}
