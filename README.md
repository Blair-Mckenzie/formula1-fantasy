# Formula1-Fantasy

This guide will help you set up run the app locally.

## Prerequisites
- Install [Go](https://go.dev/dl/)
    - Option 1: Download from the official site (link above)
    - Option 2: Bash terminal (steps below): 
        - `wget https://dl.google.com/go/go1.24.0.linux-amd64.tar.gz`
        - `sudo tar -xvf go1.18.3.linux-amd64.tar.gz`
        - `sudo mv go /usr/local`
        - Edit .bashrcfile `nano ~/.bashrc`
        - `export GOROOT=/usr/local/go`
        - `export GOPATH=$HOME/go`
        - `export PATH=$GOPATH/bin:$GOROOT/bin:$PATH`
        - `source ~/.bahsrc`
        - Check version `go version`
- Install [Firebase CLI](https://firebase.google.com/docs/cli)


## Setting Up Firebase
### 1. Install Firebase Admin SDK for Go
```sh
go get firebase.google.com/go
```

### 2. Authenticate using `gcloud`:
   ```sh
   gcloud auth application-default login
   ```

### 3. Run Go Application
```sh
go run main.go
```

## Using Firebase Emulators
Firebase provides emulators to test Firestore, Authentication, and other Firebase services locally.


### 1. Initialize Firebase Emulator Suite
Run the following command inside your project directory:
```sh
firebase init emulators
```
Select the Firestore and Authentication emulators.

### 2. Start Firebase Emulators
To run the emulators locally, use:
```sh
firebase emulators:start
```

### 3. Configure Go App to Use Emulators
Update Go code to point to the emulator:
```go
import (
	"os"
	"firebase.google.com/go/auth"
)

func main() {
	os.Setenv("FIRESTORE_EMULATOR_HOST", "localhost:8080") // Firestore
	os.Setenv("FIREBASE_AUTH_EMULATOR_HOST", "localhost:9099") // Auth
}
```

Now the Go application will use the local Firebase emulators instead of the cloud services.

