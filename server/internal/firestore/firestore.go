package firestore

import (
	"context"
	"encoding/json"
	"log"
	"os"
	"root/internal/models"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

func CreateClient() (*firestore.Client, error) {
	credentialsJSON := os.Getenv("FIREBASE_SERVICE_ACCOUNT")
	if credentialsJSON == "" {
		log.Fatal("FIREBASE_SERVICE_ACCOUNT is not set")
	}

	var credentials map[string]interface{}
	if err := json.Unmarshal([]byte(credentialsJSON), &credentials); err != nil {
		log.Fatalf("Failed to parse Firebase credentials: %v", err)
	}

	opt := option.WithCredentialsJSON([]byte(credentialsJSON))

	ctx := context.Background()
	app, err := firebase.NewApp(ctx, nil, opt)

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
	_, _, err := client.Collection("races").Add(ctx, race)
	return err
}

func InsertDriver(client *firestore.Client, driver models.Driver) error {
	ctx := context.Background()
	_, _, err := client.Collection("drivers").Add(ctx, driver)
	return err
}
