package models

import "time"

type Race struct {
	CircuitId        int
	RaceId           string
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
