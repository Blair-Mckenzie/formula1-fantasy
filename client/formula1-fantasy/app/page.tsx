"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <div className="p-2">
        
      </div>
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 p-4">
        Welcome to Formula 1 Predictor
      </h2>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
        <LoginForm/>
        </TabsContent>
        <TabsContent value="signup">
          <SignupForm/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
