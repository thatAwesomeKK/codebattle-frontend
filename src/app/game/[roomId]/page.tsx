import CodeMirror from "@/components/MatchPage/CodeMirror";
import Navbar from "@/components/MatchPage/Navbar";
import QuestionDisplay from "@/components/MatchPage/QuestionDisplay";
import StartDialog from "@/components/MatchPage/StartDialog";
import WinnerProvider from "@/components/Provider/WinnerProvider";
import { getMatchInfo } from "@/lib/apiCalls/game";
import { MatchInfo, Question } from "@/typings/typings";

interface pageProps {
  params: { roomId: string };
}

type MatchInfoFetch = {
  matchInfo: MatchInfo;
  question: Question;
};

const Game = async ({ params: { roomId } }: pageProps) => {
  const matchInfo: MatchInfoFetch = await getMatchInfo(roomId);

  return (
    <>
    <StartDialog/>
    <WinnerProvider>
      <Navbar />
      <main className="flex flex-col bg-zinc-800 h-[60vh]">
        <div className="flex h-full">
          <div className="flex-1 h-full">
            <QuestionDisplay question={matchInfo.question} />
          </div>
          <div className="flex-1 h-full">
            <CodeMirror
              initialTemplate={matchInfo.question.template}
              questionId={matchInfo.question.id}
            />
          </div>
        </div>
      </main>
    </WinnerProvider>
    </>
  );
};

export default Game;
