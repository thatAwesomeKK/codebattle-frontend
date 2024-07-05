import { compileCode } from "@/lib/apiCalls/game";
import socket from "../../lib/config/socket";
import { useCodeStore } from "@/lib/redux/store";

const Console = () => {
  const { code, questionId, setOutput, output, roomId } = useCodeStore();
  async function handleCompile() {
    const payload = await compileCode(code, "js", questionId);
    setOutput(payload);
  }

  function handleSubmit() {
    socket.emit(
      "submit-answer",
      { code, language: "js", questionId, output, roomId },
      (res: string) => {
        console.log(res);
      }
    );
  }

  return (
    <section>
      <div className="bg-[#232323] text-center px-4 w-full h-[4rem] min-h-[4rem] flex justify-between whitespace-nowrap items-center">
        <div className="flex gap-6 justify-center items-center">
          {/* Compile the Program with the user given input */}
          <button
            className="bg-[#141414] cursor-pointer text-center text-white font-bold px-4 py-2 rounded-md"
            onClick={() => handleCompile()}
          >
            Compile & Run
          </button>
          {/* Submit the Program */}
          <button
            className="bg-[#141414] text-white text-center font-bold px-4 py-2 rounded-md"
            onClick={() => handleSubmit()}
          >
            Submit
          </button>

          {/* {loading && (
            <div className="h-20 w-20 relative">
              <Image src={"/Asserts/loading.svg"} layout="fill" />
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default Console;
