"use client";
import RaceWorldMap from "@/components/race-world-map";
import { Race } from "@/models/race";
import { useQuery} from "@tanstack/react-query";

export default function Home() {
    const { isPending, isError, data, error} = useQuery<Race[]>({ queryKey: ['races'], queryFn: async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/formula1/races`);
        if (!response.ok)
            throw new Error("Failed to fetch races");
        return response.json();
    }})

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black">
            <div className="flex flex-col items-center gap-8 px-4 py-6 sm:py-10 md:px-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">The season at a glance</h1>

                {isPending ? (
                    <div className="flex flex-col items-center justify-center mt-8">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-opacity-50"></div>
                        <p className="text-gray-600 dark:text-gray-300 mt-3">Loading races...</p>
                    </div>
                ) : isError ? (
                    <p className="text-red-500 mt-6 text-center">{error.message}</p>
                ) : (
                    <div className="w-full max-w-4xl">
                        <RaceWorldMap races={data} />
                    </div>
                )}
            </div>
        </div>
    );
}
