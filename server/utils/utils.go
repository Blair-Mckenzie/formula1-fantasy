package utils

import (
	"encoding/json"
	"log"
	"os"
	"os/exec"
	"root/models"
)


func StartFirestoreEmulator() error {
	cmd := exec.Command("firebase", "emulators:start", "--only", "firestore")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	go func() {
		err := cmd.Run()
		if err != nil {
			log.Fatalf("Failed to start Firestore emulator: %v", err)
		}
	}()
	
	return nil
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