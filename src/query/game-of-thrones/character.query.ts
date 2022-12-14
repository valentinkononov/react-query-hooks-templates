import { useQuery, UseQueryResult, useMutation } from "react-query";
import { getAll, patchOne } from "./character.api";
import { PagingProps, TIME_UNITS } from "../utils";
import { Character } from "./interfaces";
import {
  UseMutationResult,
  UseQueryOptions,
} from "react-query/types/react/types";

export const characterQueryIds = {
  useCharacters: () => ["query", "game-of-thrones", "characters"],
};

export const useCharacters = (
  props: PagingProps,
  options: UseQueryOptions<Character[], unknown, Character[], string[]> = {}
): UseQueryResult<Character[]> =>
  useQuery(characterQueryIds.useCharacters(), () => getAll(props), {
    staleTime: TIME_UNITS.MINUTE * 30,
    select: (data): Character[] =>
      data.map(
        (item: Record<string, any>, index: number): Character => ({
          id: index,
          name: item.name || "who knows",
          gender: item.gender,
          culture: item.culture,
          nickName: item.aliases[0],
        })
      ),
    ...options,
  });

export const usePatchCharacter = (): UseMutationResult<
  unknown,
  unknown,
  Character
> =>
  useMutation((payload: Character) => patchOne(payload), {
    onSuccess: () => {
      console.log("Character Patched!!");
    },
    onError: (error) => {
      console.log(error);
    },
  });
