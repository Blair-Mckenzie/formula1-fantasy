"use client";
import WorldMap from "@/components/ui/world-map";
import { Race } from "@/models/race";

interface RaceWorldMapProps {
    races: Race[];
}

export default function RaceWorldMap({ races }: RaceWorldMapProps) {
    const dots = races.map((race, index) => ({
        start: {
            lat: race.circuit.location.lat,
            lng: race.circuit.location.lng,
            label: race.raceName,
        },
        end: races[index + 1]
            ? {
                lat: races[index + 1].circuit.location.lat,
                lng: races[index + 1].circuit.location.lng,
                label: races[index + 1].raceName,
            }
            : {
                lat: race.circuit.location.lat,
                lng: race.circuit.location.lng,
                label: race.raceName,
            },
    }));

    return (
        <div className="py-6 sm:py-8 lg:py-10 dark:bg-black bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto h-96 sm:h-[400px] md:h-[450px] lg:h-[500px]">
            <WorldMap dots={dots} />
        </div>
    );
}
