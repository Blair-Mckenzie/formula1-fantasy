package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"root/models"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
)

func main() {
	os.Setenv("FIRESTORE_EMULATOR_HOST", "localhost:8080")
	ctx := context.Background()
	conf := &firebase.Config{ProjectID: "formula1-fantasy-31eb5"}
	app, err := firebase.NewApp(ctx, conf)

	if err != nil {
		log.Printf("error initialising app: %v", err)
		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Print("error initialising client")
		log.Fatalln(err)
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

	if err != nil {
		log.Printf("Error occurred when creating entry: %v", err)
	}
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

func InsertGrandPrix(client *firestore.Client, race models.Race) error {
	ctx := context.Background()
	_, err := client.Collection("races").Doc(race.RaceId).Set(ctx, race)
	return err
}
