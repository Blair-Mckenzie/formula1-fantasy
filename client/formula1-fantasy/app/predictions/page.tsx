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
import React, { ReactNode } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { Race } from "@/models/race";
import { useQuery } from "@tanstack/react-query";

const FormSchema = z.object({
  polePosition: z.string(),
  winner: z.string(),
  secondPlace: z.string(),
  thirdPlace: z.string(),
  lastPlace: z.string(),
  classifiedFinishers: z.number(),
});

function PredictionsForm({
  drivers,
  raceId,
}: {
  drivers: Driver[];
  raceId: string;
}): ReactNode {
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
    console.log(JSON.stringify({ ...data, raceId }));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full mt-2 space-y-6 flex flex-col items-center gap-2"
      >
        <FormField
          control={form.control}
          name="polePosition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pole Position</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[350px] h-[75px]">
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
                <SelectTrigger className="w-[350px] h-[75px]">
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
                <SelectTrigger className="w-[350px] h-[75px]">
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
                <SelectTrigger className="w-[350px] h-[75px]">
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
                <SelectTrigger className="w-[350px] h-[75px]">
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
                <SelectTrigger className="w-[350px] h-[75px]">
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

export default function Predictions() {
  const { isPending, isError, data, error } = useQuery<Race[]>({
    queryKey: ["races"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/formula1/races`
      );
      if (!response.ok) throw new Error("Failed to fetch races");
      return response.json();
    },
  });

  const {
    data: drivers,
    isPending: isDriversPending,
    isError: isDriversError,
  } = useQuery<Driver[]>({
    queryKey: ["drivers"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/formula1/drivers`
      );
      if (!response.ok) throw new Error("Failed to fetch drivers");
      return response.json();
    },
  });

  if (isPending || isDriversPending) return <p>Loading...</p>;
  if (isError || isDriversError) return <p>Error loading data</p>;

  return (
    <div className="flex justify-center">
      <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full sm:w-[70%]">
        {data?.map((race, index) => (
          <Modal key={index}>
            <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]">
              <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 flex items-center justify-center">
                {race.raceName}
              </span>
              <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                <Image
                  src={race.imagePath}
                  alt="alt"
                  width="150"
                  height="150"
                ></Image>
              </div>
            </ModalTrigger>
            <ModalBody>
              <ModalContent className="overflow-auto">
                <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-2">
                  Enter your predictions for the {race.raceName}
                </h4>
                <PredictionsForm
                  drivers={drivers}
                  raceId={race.raceId}
                ></PredictionsForm>
              </ModalContent>
              <ModalFooter className="gap-4">
                <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                  Cancel
                </button>
                <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                  Save
                </button>
              </ModalFooter>
            </ModalBody>
          </Modal>
        ))}
      </div>
    </div>
  );
}
