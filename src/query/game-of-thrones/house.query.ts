import { useQuery, UseQueryResult } from "react-query";
import { getAll } from "./house.api";
import { PagingProps, TIME_UNITS } from "../utils";
import { House } from "./interfaces";

export const houseQueryIds = {
  useHouses: () => ["query", "game-of-thrones", "houses"],
};

export const useHouses = (props: PagingProps): UseQueryResult<House[]> =>
  useQuery(houseQueryIds.useHouses(), () => getAll(props), {
    staleTime: TIME_UNITS.SECOND,
    select: (data): House[] =>
      data.map(
        (item: Record<string, any>, index: number): House => ({
          id: index,
          name: item.name || "who knows",
          region: item.region,
          words: item.words,
        })
      ),
  });
