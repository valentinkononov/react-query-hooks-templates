import { PagingProps } from "../utils";
import axios from "../api";

export const getAll = async ({ page = 1, pageSize = 10 }: PagingProps) => {
  console.log("[API]: Houses are loading");
  const { data } = await axios.get(`/api/houses`, {
    params: {
      page,
      pageSize,
    },
  });
  console.log("[API]: Houses are LOADED");
  return data;
};
