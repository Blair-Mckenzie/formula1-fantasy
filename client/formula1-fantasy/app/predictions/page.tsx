"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Driver } from "@/models/driver";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  polePosition: z.string(),
  winner: z.string(),
  secondPlace: z.string(),
  thirdPlace: z.string(),
  lastPlace: z.string(),
  classifiedFinishers: z.number(),
});

export default function PredictionsForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      polePosition: "",
      winner: "",
      secondPlace: "",
      thirdPlace: "",
      lastPlace: "",
      classifiedFinishers: 0,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data));
  }

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/formula1/drivers`
        );
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full mt-5 space-y-6 flex flex-col items-center gap-2"
      >
        <FormField
          control={form.control}
          name="polePosition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pole Position</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[250px] h-[75px]">
                  <SelectValue placeholder="Select a driver" />
                </SelectTrigger>
                <SelectContent>
                  {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      <Image
                        src={driver.imagePath}
                        alt="alt"
                        width="64"
                        height="64"
                      ></Image>
                      {driver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="winner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Winner</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[250px] h-[75px]">
                  <SelectValue placeholder="Select a driver" />
                </SelectTrigger>
                <SelectContent>
                  {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      <Image
                        src={driver.imagePath}
                        alt="alt"
                        width="64"
                        height="64"
                      ></Image>
                      {driver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="secondPlace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>2nd Place</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[250px] h-[75px]">
                  <SelectValue placeholder="Select a driver" />
                </SelectTrigger>
                <SelectContent>
                  {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      <Image
                        src={driver.imagePath}
                        alt="alt"
                        width="64"
                        height="64"
                      ></Image>
                      {driver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thirdPlace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>3rd Place</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[250px] h-[75px]">
                  <SelectValue placeholder="Select a driver" />
                </SelectTrigger>
                <SelectContent>
                  {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      <Image
                        src={driver.imagePath}
                        alt="alt"
                        width="64"
                        height="64"
                      ></Image>
                      {driver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastPlace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Place</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[250px] h-[75px]">
                  <SelectValue placeholder="Select a driver" />
                </SelectTrigger>
                <SelectContent>
                  {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      <Image
                        src={driver.imagePath}
                        alt="alt"
                        width="64"
                        height="64"
                      ></Image>
                      {driver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="classifiedFinishers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classified finishers</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <SelectTrigger className="w-[250px] h-[75px]">
                  <SelectValue placeholder="Select a number" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(20)].map((_, index) => (
                    <SelectItem key={index + 1} value={(index + 1).toString()}>
                      {index + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit">Save Predictions</Button>
      </form>
    </Form>
  );
}
