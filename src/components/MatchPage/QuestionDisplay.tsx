import { Question } from "@/typings/typings";
import OutputDisplay from "./OutputDisplay";

interface Props {
  question: Question;
}

const QuestionDisplay = ({ question }: Props) => {
  return (
    <section className="overflow-y-scroll h-full text-white">
      {/* Question Full Info */}
      <div className="flex p-4 gap-4 flex-col w-full  h-full max-h-[90%]">
        <div className="text-xl py-4 font-bold border-b-[1px] border-white">
          {question?.title}
        </div>
        <div className="flex flex-col gap-4">
          {question?.content?.map((content: any, i) => (
            <p key={i} className="text-xl">
              {content.text}
            </p>
          ))}
        </div>
        {/* Given Input and Output */}
        <div className="flex flex-col gap-4 w-[80%] h-fit">
          <div className="flex flex-col gap-3">
            <div className="text-xl font-bold">Input</div>
            <div className="text-xl flex flex-col pl-4 pb-2 h-fit w-full justify-center bg-[#232323]">
              <span>nums = {question?.input[0].nums}</span>
              {question?.input[0]?.target && (
                <span>target = {question?.input[0]?.target}</span>
              )}
            </div>
          </div>
          <OutputDisplay/>
          <div className="flex flex-col gap-3">
            <div className="text-xl font-bold">Expected Output</div>
            <div className="text-xl flex flex-col pl-4 pb-2 h-fit w-full justify-center bg-[#232323]">
              <span>{question?.output[0]?.desiredOutput!}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionDisplay;
