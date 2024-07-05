import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  winner: string;
  setModalOpen: (open: boolean) => void;
  modalOpen: boolean;
}

const WinnerModal = ({ winner, modalOpen, setModalOpen }: Props) => {
  const router = useRouter();
  const handleWinner = () => {
    setModalOpen(false);
    localStorage.clear()
    router.push("/");
  };
  const username = localStorage.getItem("username");
  return (
    <Dialog open={modalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {username === winner ? "You are the Winner!" : "You have Lost!"}
          </DialogTitle>
          <DialogDescription>
            {username === winner
              ? "Congratulations for winning the game!"
              : `The game has been finished and the winner is ${winner}!`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              onClick={() => handleWinner()}
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WinnerModal;
