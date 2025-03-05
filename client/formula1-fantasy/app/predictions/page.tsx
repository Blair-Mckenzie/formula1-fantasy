"use client";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Driver } from "@/models/driver";

export default function Predictions() {

    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await fetch("/api/v1/formula1/drivers");
                if (!response.ok) {
                    throw new Error("Failed to fetch drivers");
                }
                const data = await response.json();
                setDrivers(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchDrivers();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center">
                <p>Loading drivers...</p>
            </div>
        );
    }

    // If there's an error, show an error message
    if (error) {
        return (
            <div className="flex items-center justify-center text-red-500">
                <p>Error: {error}</p>
            </div>
        );
    }
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a driver" />
            </SelectTrigger>
            <SelectContent>
                {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                        {driver.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
