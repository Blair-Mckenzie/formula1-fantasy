"use client";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Menu, X } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export function NavbarComponent() {
  return (
    <div className="relative w-full flex items-center justify-between p-2 h-[45px]">
      <Navbar />
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full">
      {/* Desktop Menu */}
      <div className="hidden md:flex w-full">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="flex flex-row justify-between w-full">
            <div className="flex flex-row space-x-4">
              <NavItem href="/">Home</NavItem>
              <NavItem href="/predictions">Predictions</NavItem>
              <NavItem href="/leaderboard">Leaderboard</NavItem>
            </div>
            <ModeToggle />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Menu Button (Drawer Trigger) */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <div className="flex items-center justify-between">
            <button
              className="md:hidden p-2 text-gray-700 dark:text-white"
              onClick={() => setIsOpen(true)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </DrawerTrigger>

        {/* Drawer Content */}
        <DrawerContent className="p-4">
          <div className="flex flex-col space-y-6 h-[250px]">
            <Link href="/home">Home</Link>
            <Link href="/predictions">Predictions</Link>
            <Link href="/leaderboard">Leaderboard</Link>
          </div>
        </DrawerContent>
      </Drawer>
    </nav>
  );
}

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, children, mobile }) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href={href} className={`block ${mobile ? "py-2 text-lg" : ""}`}>
          {children}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};
