export type Question = {
  id: number;
  title: string;
  content: Array<Content>;
  input: Array<Input>;
  output: Array<Output>;
  template: string;
};

export type MatchInfo = {
  _id: string;
  player1: string;
  player2: string;
  questionId: string;
  roomId: string;
  finished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Input = {
  nums: string;
  target: string;
};

export type Output = {
  desiredOutput: string;
};

export type Content = {
  span: number;
  text: string;
};
