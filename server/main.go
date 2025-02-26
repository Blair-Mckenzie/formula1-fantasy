package main

import (
	"context"
	"log"

	firebase "firebase.google.com/go"
)

func main()  {
	ctx := context.Background()
	conf := &firebase.Config{ProjectID: "formula1-fantasy-31eb5"}
	app,err := firebase.NewApp(ctx, conf)

	if err != nil {
		log.Printf("error initialising app: %v", err)
		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Print("error initialising client")
  		log.Fatalln(err)
	}
	
	_, _, err = client.Collection("test").Add(ctx, map[string]interface{}{
		"first": "Fred",
		"last":  "Again",
		"occupation":  "Producer",
	})

	if err != nil {
		log.Printf("Error occurred when creating entry: %v", err)
	}
}