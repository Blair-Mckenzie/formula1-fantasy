package firestore

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"log"
	"os"
	"root/internal/models"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"
)

func CreateClient() (*firestore.Client, *auth.Client, error) {
	encodedJSON := os.Getenv("FIREBASE_SERVICE_ACCOUNT_BASE64")
	if encodedJSON == "" {
		log.Fatal("FIREBASE_SERVICE_ACCOUNT is not set")
	}

	decodedJSON, err := base64.StdEncoding.DecodeString(encodedJSON)
	if err != nil {
		log.Fatalf("Error decoding Base64: %v", err)
	}

	var credentials map[string]interface{}
	if err := json.Unmarshal([]byte(decodedJSON), &credentials); err != nil {
		log.Fatalf("Failed to parse Firebase credentials: %v", err)
	}

	opt := option.WithCredentialsJSON([]byte(decodedJSON))

	ctx := context.Background()
	app, err := firebase.NewApp(ctx, nil, opt)

	if err != nil {
		log.Printf("error initialising app: %v", err)
		return nil, nil, err
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Print("error initialising client")
		return nil, nil, err
	}

	authClient, err := app.Auth(ctx)
	if err != nil {
		log.Print("error initialising auth client")
		return nil, nil, err
	}

	return client, authClient, nil
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
