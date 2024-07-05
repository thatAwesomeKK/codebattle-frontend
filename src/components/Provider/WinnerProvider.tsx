"use client";
import socket from "../../lib/config/socket";
import React, { useEffect, useState } from "react";
import WinnerModal from "../MatchPage/WinnerModal";

const WinnerProvider = ({ children }: { children: React.ReactNode }) => {
  const [winner, setWinner] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  //@ts-ignore
  useEffect(() => {
    socket.on("winner", ({ user }) => {
      console.log("Won! " + user);
      setWinner(user);
      setModalOpen(true);
    });
    return () => socket.off("winner");
  }, []);
  return (
    <>
      <WinnerModal winner={winner} modalOpen={modalOpen} setModalOpen={setModalOpen}/>
      {children}
    </>
  );
};

export default WinnerProvider;
