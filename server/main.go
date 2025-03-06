package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"root/internal/firestore"
	"root/internal/utils"
	"root/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	utils.LoadEnv()

	if os.Getenv("PRODUCTION") == "false" {	
		err := utils.StartFirebaseEmulators()
		if err != nil {
			log.Fatalf("Failed to start Firestore emulator: %v", err)
		}

		time.Sleep(3 * time.Second)

		os.Setenv("FIRESTORE_EMULATOR_HOST", "localhost:8070")

		fireStoreclient, _, err := firestore.CreateClient()
		if err != nil {
			log.Printf("Error creating client %v", err)
		}
		races, err := utils.LoadRaces("races.json")
		if err != nil {
			log.Fatalf("Error loading data %v", err)
		}
		for _, race := range races {
			err := firestore.InsertGrandPrix(fireStoreclient, race)
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
			err := firestore.InsertDriver(fireStoreclient, driver)
			if err != nil {
				log.Printf("Failed to insert Grand Prix (%s): %v", driver.Name, err)
			} else {
				fmt.Printf("Inserted: %s\n", driver.Name)
			}
		}
	}

	fireStoreclient, authClient, err := firestore.CreateClient()
	if err != nil {
		log.Printf("Error creating fireStore or auth client %v", err)
	}
	log.Printf("Firestore Client created successfully %v", fireStoreclient)
	log.Printf("Auth Client created successfully %v", authClient)
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://gallant-inspiration-production.up.railway.app"}, // Allow Next.js frontend
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Access-Control-Allow-Headers", "Authorization"},
		AllowCredentials: true,
	}))

	api := router.Group("/api")

	routes.SetupV1Routes(api, fireStoreclient, authClient)

	router.Run()
}
