package main

import "time"

type Race struct {
	CircuitId        int
	RaceId           int
	RaceName         string
	CountryId        int
	CountryCode      string
	CountryName      string
	OfficialRaceName string
	DateStart        time.Time
	CutoffTime       time.Time
	Year             int
	IsSprint         bool
}
