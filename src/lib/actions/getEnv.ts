"use server";

export const getBackendUrl = async () => {
  return process.env.BACKEND_URL || "";
};
