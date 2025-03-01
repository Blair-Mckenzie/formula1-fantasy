package models

import "time"

type Race struct {
	Year       int       `json:"year"`
	Round      int       `json:"round"`
	RaceId     string    `json:"raceId"`
	RaceName   string    `json:"raceName"`
	Circuit    Circuit   `json:"circuit"`
	Date       time.Time `json:"date"`
	CutoffTime time.Time `json:"cutoffTime"`
}

type Circuit struct {
	CircuitId   string   `json:"circuitId"`
	URL         string   `json:"url"`
	CircuitName string   `json:"circuitName"`
	Location    Location `json:"location"`
}

type Location struct {
	Latitude  float32 `json:"lat"`
	Longitude float32 `json:"lng"`
	Country   string `json:"country"`
}
