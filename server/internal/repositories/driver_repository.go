package repositories

import (
	"context"
	"errors"
	"log"
	"root/internal/models"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

func GetAllDrivers(client *firestore.Client) ([]models.Driver, error) {
	ctx := context.Background()
	var drivers []models.Driver
	iter := client.Collection("drivers").OrderBy("Name", firestore.Asc).Documents(ctx)
	defer iter.Stop()
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		var race models.Driver
		if err := doc.DataTo(&race); err != nil {
			log.Printf("Error decoding document: %v", err)
			return nil, err
		}
		drivers = append(drivers, race)
	}
	return drivers, nil
}

func GetDriverById(client *firestore.Client, driverId string) (*models.Driver, error) {
	ctx := context.Background()

	doc, err := client.Collection("drivers").Doc(driverId).Get(ctx)
	if err != nil {
		return nil, errors.New("driver not found")
	}

	var driver models.Driver
	if err := doc.DataTo(&driver); err != nil {
		log.Printf("Error decoding document: %v", err)
			return nil, err
	}

	return &driver, nil
}