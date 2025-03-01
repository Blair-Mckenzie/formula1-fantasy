package repositories

import (
	"context"
	"errors"
	"log"
	"root/internal/models"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

func GetAllRaces(client *firestore.Client) ([]models.Race, error) {
	ctx := context.Background()
	var races []models.Race
	iter := client.Collection("races").OrderBy("Round", firestore.Asc).Documents(ctx)
	defer iter.Stop()
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		var race models.Race
		if err := doc.DataTo(&race); err != nil {
			log.Printf("Error decoding document: %v", err)
			return nil, err
		}
		races = append(races, race)
	}
	return races, nil
}

func GetRaceByID(client *firestore.Client, raceId string) (*models.Race, error) {
	ctx := context.Background()

	iter := client.Collection("races").Where("raceId", "==", raceId).Limit(1).Documents(ctx)
	defer iter.Stop()
	doc, err := iter.Next()
	if err == iterator.Done {
		return nil, errors.New("race not found")
	}

	var race models.Race
	if err := doc.DataTo(&race); err != nil {
		log.Printf("Error decoding document: %v", err)
		return nil, err
	}

	return &race, nil
}
