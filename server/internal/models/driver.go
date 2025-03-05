package models

type Driver struct {
	Id   string	`json:"id"`
	Name string `json:"name"`
	Team string	`json:"team"`
	ImagePath string `json:"imagePath"`
}
