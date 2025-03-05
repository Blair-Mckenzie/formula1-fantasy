"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Race } from "@/models/race";
import RaceWorldMap from "@/components/race-world-map";
import { NavbarComponent } from "@/components/navbar";


export default function Home() {
    const router = useRouter();

    const [races, setRaces] = useState<Race[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const response = await fetch("/api/v1/formula1/races");
                if (!response.ok) {
                    throw new Error("Failed to fetch races");
                }
                const data = await response.json();
                setRaces(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchRaces();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black">
            <NavbarComponent />
            <div className="flex flex-col items-center gap-8 px-4 py-6 sm:py-10 md:px-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">The season at a glance</h1>

                {loading ? (
                    <div className="flex flex-col items-center justify-center mt-8">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-opacity-50"></div>
                        <p className="text-gray-600 dark:text-gray-300 mt-3">Loading races...</p>
                    </div>
                ) : error ? (
                    <p className="text-red-500 mt-6 text-center">{error}</p>
                ) : (
                    <div className="w-full max-w-4xl">
                        <RaceWorldMap races={races} />
                    </div>
                )}
            </div>
        </div>
    );
}
