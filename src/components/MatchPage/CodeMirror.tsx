"use client";
import { default as CodeM } from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { githubDark } from "@uiw/codemirror-theme-github";
import Console from "./Console";
import { useCodeStore } from "@/lib/redux/store";
import { useEffect } from "react";

interface Props {
  initialTemplate: string;
  questionId: number;
}

const CodeMirror = ({ initialTemplate, questionId }: Props) => {
  const { code, setCode, setQuestionId } = useCodeStore();
  useEffect(() => {
    setCode(initialTemplate);
    setQuestionId(questionId);
  }, []);

  return (
    <>
      <div className="overflow-y-scroll">
        <CodeM
          value={code}
          theme={githubDark}
          style={{ fontSize: "1.2rem" }}
          height="540px"
          extensions={[cpp(), python()]}
          onChange={(value) => setCode(value)}
        />
      </div>
      <Console />
    </>
  );
};

export default CodeMirror;
