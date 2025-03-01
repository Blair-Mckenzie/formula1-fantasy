package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"root/db"
	"root/routes"
	"root/utils"

	"github.com/gin-gonic/gin"
)

func main() {
	err := utils.StartFirestoreEmulator()
	if err != nil {
		log.Fatalf("Failed to start Firestore emulator: %v", err)
	}

	time.Sleep(3 * time.Second)

	os.Setenv("FIRESTORE_EMULATOR_HOST", "localhost:8080")

	client, err := db.CreateClient()
	if err != nil {
		log.Printf("Error creating client %v", err)
	}

	races, err := utils.LoadData("races.json")
	if err != nil {
		log.Fatalf("Error loading data %v", err)
	}

	for _, race := range races {
		err := db.InsertGrandPrix(client, race)
		if err != nil {
			log.Printf("Failed to insert Grand Prix (%s): %v", race.RaceName, err)
		} else {
			fmt.Printf("Inserted: %s\n", race.RaceName)
		}
	}

	router := gin.Default()

	api := router.Group("/api")

	routes.SetupV1Routes(api)

	router.Run(":3000")
}
