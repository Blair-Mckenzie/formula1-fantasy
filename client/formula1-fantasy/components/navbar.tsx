"use client";
import React from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function NavbarComponent() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar />
        </div>
    );
}

function Navbar() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink>
                        Home
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/predictions">
                            Predictions
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/leaderboard">
                        Leaderboard
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                <ModeToggle></ModeToggle>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
