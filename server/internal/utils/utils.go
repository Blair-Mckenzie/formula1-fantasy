package utils

import (
	"encoding/json"
	"log"
	"os"
	"os/exec"
	"root/internal/models"
)


func StartFirebaseEmulators() error {
	cmd := exec.Command("firebase", "emulators:start")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	go func() {
		err := cmd.Run()
		if err != nil {
			log.Fatalf("Failed to start Firebase emulators: %v", err)
		}
	}()
	
	return nil
}

func LoadRaces(filename string) ([]models.Race, error) {
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

func LoadDrivers(filename string) ([]models.Driver, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var drivers []models.Driver
	if err := json.NewDecoder(file).Decode(&drivers); err != nil {
		return nil, err
	}

	return drivers, nil
}