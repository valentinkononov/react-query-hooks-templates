import axios from "../api";
import { PagingProps } from "../utils";
import { Character } from "./interfaces";

export const getAll = async ({
  page = 1,
  pageSize = 10,
}: PagingProps): Promise<any> => {
  console.log("[API]: Characters are loading");
  const { data } = await axios.get(`/api/characters`, {
    params: {
      page,
      pageSize,
    },
  });
  console.log("[API]: Characters are LOADED");
  return data;
};

export const patchOne = async (payload: Character): Promise<unknown> => {
  console.log("[API]: Ready to patch Character!");
  const { data } = await axios.patch(`/api/characters/${payload.id}`, payload);
  console.log("[API]: PATCH COMPLETED!");
  return data;
};
