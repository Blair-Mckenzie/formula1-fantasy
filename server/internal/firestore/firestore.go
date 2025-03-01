package firestore

import (
	"context"
	"log"
	"root/internal/models"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
)

func CreateClient() (*firestore.Client, error) {
	ctx := context.Background()
	conf := &firebase.Config{ProjectID: "formula1-fantasy-31eb5"}
	app, err := firebase.NewApp(ctx, conf)

	if err != nil {
		log.Printf("error initialising app: %v", err)
		return nil, err
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Print("error initialising client")
		return nil, err
	}

	return client, nil
}

func InsertGrandPrix(client *firestore.Client, race models.Race) error {
	ctx := context.Background()
	_, err := client.Collection("races").Doc(race.RaceId).Set(ctx, race)
	return err
}
