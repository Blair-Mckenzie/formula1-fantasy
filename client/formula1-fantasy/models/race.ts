export interface Race {
    year: number;
    round: number;
    raceId: string;
    raceName: string;
    circuit: Circuit;
    date: string;
    cutoffTime: string;
    imagePath: string;
}

interface Circuit {
    circuitId: string;
    url: string;
    circuitName: string;
    location: Location;
}

interface Location {
    lat: number;
    lng: number;
    country: string;
}