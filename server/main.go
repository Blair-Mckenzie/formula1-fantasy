package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"root/internal/firestore"
	"root/internal/utils"
	"root/routes"
)

func main() {
	// Set this to true when developing locally with the firestore emulator
	localDev := false

	if localDev {
		err := utils.StartFirebaseEmulators()
		if err != nil {
			log.Fatalf("Failed to start Firestore emulator: %v", err)
		}

		time.Sleep(3 * time.Second)

		os.Setenv("FIRESTORE_EMULATOR_HOST", "localhost:8080")

		client, err := firestore.CreateClient()
		if err != nil {
			log.Printf("Error creating client %v", err)
		}
		races, err := utils.LoadRaces("races.json")
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

		drivers, err := utils.LoadDrivers("drivers.json")
		if err != nil {
			log.Fatalf("Error loading data %v", err)
		}
		for _, driver := range drivers {
			err := firestore.InsertDriver(client, driver)
			if err != nil {
				log.Printf("Failed to insert Grand Prix (%s): %v", driver.Name, err)
			} else {
				fmt.Printf("Inserted: %s\n", driver.Name)
			}
		}
	}

	client, err := firestore.CreateClient()
	if err != nil {
		log.Printf("Error creating client %v", err)
	}
	log.Printf("Client created successfully %v", client)
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Allow Next.js frontend
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))

	api := router.Group("/api")

	routes.SetupV1Routes(api, client)

	router.Run(":3001")
}
