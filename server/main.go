package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"root/internal/firestore"
	"root/routes"
	"root/internal/utils"

	"github.com/gin-gonic/gin"
)

func main() {
	// Set this to true when developing locally with the firestore emulator
	localDev := true

	if localDev {
		err := utils.StartFirestoreEmulator()
		if err != nil {
			log.Fatalf("Failed to start Firestore emulator: %v", err)
		}

		time.Sleep(3 * time.Second)

		os.Setenv("FIRESTORE_EMULATOR_HOST", "localhost:8080")

		client, err := firestore.CreateClient()
		if err != nil {
			log.Printf("Error creating client %v", err)
		}
		races, err := utils.LoadData("races.json")
		if err != nil {
			log.Fatalf("Error loading data %v", err)
		}
		for _, race := range races {
			err := firestore.InsertGrandPrix(client, race)
			if err != nil {
				log.Printf("Failed to insert Grand Prix (%s): %v", race.RaceName, err)
			} else {
				fmt.Printf("Inserted: %s\n", race.RaceName)
			}
		}

	}

	client, err := firestore.CreateClient()
	if err != nil {
		log.Printf("Error creating client %v", err)
	}
	log.Printf("Client created successfully %v", client)
	router := gin.Default()

	api := router.Group("/api")

	routes.SetupV1Routes(api, client)

	router.Run(":3000")
}
