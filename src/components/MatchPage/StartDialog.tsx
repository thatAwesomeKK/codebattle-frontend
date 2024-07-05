"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useCodeStore } from "@/lib/redux/store";
import socket from "@/lib/config/socket";
import { LoaderCircle } from "lucide-react";

const StartDialog = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const { roomId } = useCodeStore();
  const handleStartGame = () => {
    setLoading(true);
    socket.emit(
      "start-game",
      { username: localStorage.getItem("username"), roomId },
      (res: string) => {
        console.log(res);
      }
    );
  };

  //@ts-ignore
  useEffect(() => {
    socket.once("starting", () => {
      setLoading(false);
      setIsModalOpen(false);
    });
    return () => socket.off("starting");
  }, []);

  return (
    <Dialog defaultOpen open={isModalOpen}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle>Start Game</DialogTitle>
          <DialogDescription>
            Press the button below to start the game, the timer will start as
            soon as you press the button.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            onClick={() => handleStartGame()}
            type="button"
            variant="secondary"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Start Game"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StartDialog;
