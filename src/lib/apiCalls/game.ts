import { getBackendUrl } from "../actions/getEnv";

const isServer = typeof window === "undefined";
const base_url = async () => {
  const host_url = isServer ? process.env.BACKEND_URL : await getBackendUrl();
  return `${host_url}/api/game`;
};

export async function getMatchInfo(roomId: string) {
  try {
    const payload = await fetch(
      `${await base_url()}/match-info?roomId=${roomId}`
    ).then((res) => res.json());
    return payload.message;
  } catch (error) {
    console.log(error);
  }
}

export async function compileCode(
  code: string,
  language: string = "js",
  questionId: number
) {
  try {
    const payload = await fetch(`${await base_url()}/compile-answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, language, questionId }),
    }).then((res) => res.json());
    console.log(payload);

    return payload.message.output;
  } catch (error) {
    console.log(error);
  }
}

export async function submitCode(
  code: string,
  language: string = "js",
  questionId: number,
  answer: string,
  roomId: string
) {
  try {
    const payload = await fetch(`${await base_url()}/submit-answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, language, questionId, answer, roomId}),
    }).then((res) => res.json());
    console.log(payload);

    return payload.message.output;
  } catch (error) {
    console.log(error);
  }
}
