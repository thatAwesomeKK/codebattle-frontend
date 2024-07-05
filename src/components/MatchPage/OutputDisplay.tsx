"use client";
import { useCodeStore } from "@/lib/redux/store";
import React from "react";

const OutputDisplay = () => {
  const { output } = useCodeStore();
  return (
    <div className="flex flex-col gap-3">
      <div className="text-xl font-bold">Your Output</div>
      <div className="text-xl flex flex-col pl-4 pb-2 h-fit w-full justify-center bg-[#232323]">
        <span>{output}</span>
      </div>
    </div>
  );
};

export default OutputDisplay;
