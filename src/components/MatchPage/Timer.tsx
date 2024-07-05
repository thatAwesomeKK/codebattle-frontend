"use client";
import socket from "@/lib/config/socket";
import React, { useEffect, useState } from "react";

const Timer = () => {
  const [timer, setTimer] = useState(60);

  const startTimer = () => {
    let time = timer;
    const interval = setInterval(() => {
      time--;
      setTimer(time);
      if (time === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  //@ts-ignore
  useEffect(() => {
    socket.once("starting", () => {
      startTimer();
    });
    return () => socket.off("starting");
  }, []);
  return <p className="text-lg">Timer: {timer}</p>;
};

export default Timer;
