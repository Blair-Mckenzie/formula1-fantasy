"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Race } from "@/models/race";
import RaceWorldMap from "@/components/race-world-map";
import { NavbarDemo } from "@/components/navbar";


export default function Home() {
    const router = useRouter();

    const [races, setRaces] = useState<Race[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/v1/formula1/races");
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
        <div>
            <NavbarDemo />
            <div className="flex flex-col items-center gap-10 h-screen bg-gray-100 dark:bg-black">
                <h1 className="text-2xl font-bold">Welcome to Formula 1 Predictor! 🏎️</h1>
                {loading ? (
                    // 🔄 Show a loading spinner while fetching races
                    <div className="flex flex-col items-center justify-center mt-6">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-opacity-50"></div>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">Loading races...</p>
                    </div>
                ) : error ? (
                    <p className="text-red-500 mt-6">Error: {error}</p>
                ) : (
                    // ✅ Show the content once the data is loaded
                    <>
                        <RaceWorldMap races={races} />
                        <button
                            className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                            onClick={() => router.push("/")}
                        >
                            Go to Homepage
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
