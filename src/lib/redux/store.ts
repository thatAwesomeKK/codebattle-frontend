import { create } from "zustand";

type CodeStore = {
  code: string;
  questionId: number;
  output: string;
  roomId: string;
  setCode: (newCode: string) => void;
  setQuestionId: (newQuestionId: number) => void;
  setOutput: (newOutput: string) => void;
  setRoomId: (newRoomId: string) => void;
};

export const useCodeStore = create<CodeStore>()((set) => ({
  code: "",
  questionId: NaN,
  output: "",
  roomId: "",
  setCode: (newCode: string) => set({ code: newCode }),
  setQuestionId: (newQuestionId: number) => set({ questionId: newQuestionId }),
  setOutput: (newOutput: string) => set({ output: newOutput }),
  setRoomId: (newRoomId: string) => set({ roomId: newRoomId }),
}));
