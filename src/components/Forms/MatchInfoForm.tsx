"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import socket from "../../lib/config/socket";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCodeStore } from "@/lib/redux/store";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const MatchInfoForm = () => {
  const { setRoomId } = useCodeStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem("username", values.username);
    socket.emit("find-match", { username: values.username }, (res: string) => {
      console.log(res);
    });
  }

  //@ts-ignore
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server" + socket.id);
      localStorage.setItem("id", socket.id as string);
    });

    socket.on("disconnect", () => {
      console.log("disconnected from server.");
    });

    socket.connect();
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  //@ts-ignore
  useEffect(() => {
    socket.once("setup-game", ({ roomId }) => {
      setRoomId(roomId);
      router.push(`/game/${roomId}`);
    });
    return () => socket.off("setup-game");
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>This is your Gamer Name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default MatchInfoForm;
