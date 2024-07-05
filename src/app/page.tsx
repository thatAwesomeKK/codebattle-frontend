import MatchInfoForm from "@/components/Forms/MatchInfoForm";

export default function Home() {
  return (
    <main className="flex justify-center relative select-none items-center flex-col h-screen w-screen   bg-black space-y-6">
      <h3 className="text-2xl text-white font-bold shadow-lg z-[1] absolute top-4 left-4">
        Coding Battle!
      </h3>
      <MatchInfoForm />
    </main>
  );
}
