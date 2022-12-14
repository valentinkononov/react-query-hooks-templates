import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  characterQueryIds,
  useCharacters,
  usePatchCharacter,
} from "./query/game-of-thrones/character.query";
import { houseQueryIds, useHouses } from "./query/game-of-thrones/house.query";

// this should be defined somewhere in the top, once per application or module
// level of caching and data scope management
const queryClient = new QueryClient();

/*
    // some options for useQuery
    enabled?: boolean;
    staleTime?: number;
    onSuccess?: (data: TData) => void;
    onError?: (err: TError) => void;
    select?: (data: TQueryData) => TData;
    placeholderData?: TQueryData | PlaceholderDataFunction<TQueryData>;
*/

/*
    // what is returned by query
    data: object;
    error: object;
    isError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isLoadingError: boolean;
    isRefetchError: boolean;
    isSuccess: boolean;
    status: 'idle' | error' | 'success' | 'loading'
 */

const HookedComponent = () => {
  const {
    data: housesData,
    isLoading: housesIsLoading,
    isSuccess: housesIsSuccess,
  } = useHouses({
    page: 1,
    pageSize: 10,
  });

  const {
    data: characterData,
    isLoading: characterIsLoading,
    isSuccess: characterIsSuccess,
    refetch,
  } = useCharacters(
    {
      page: 1,
      pageSize: 10,
    },
    {
      enabled: housesIsSuccess,
    }
  );

  const { mutate } = usePatchCharacter();

  const invalidateHouses = async () => {
    await queryClient.invalidateQueries(houseQueryIds.useHouses());
    console.log("houses invalidated");
  };

  const invalidateCharacters = async () => {
    await queryClient.invalidateQueries(characterQueryIds.useCharacters());
    console.log("characters invalidated");
  };

  const patchCharacter = () => {
    if (characterData) {
      mutate(characterData[0]);
    }
  };

  console.log(
    `Render. Houses loading: ${housesIsLoading}, characters loading: ${characterIsLoading}`
  );

  return (
    <>
      <button onClick={() => invalidateHouses()}>Invalidate Houses</button>
      <button onClick={() => invalidateCharacters()}>
        Invalidate Characters
      </button>
      <button onClick={() => patchCharacter()}>Imitate Patch Character</button>
      <h1>Houses</h1>
      <p>
        IsSuccess: {housesIsSuccess.toString()}
        <br />
        IsLoading: {housesIsLoading.toString()}
      </p>
      <h2>Data</h2>
      <div>
        {housesIsSuccess &&
          housesData.map((house) => (
            <div key={house.id}>
              <div>
                name: {house.name}, region: {house.region}
              </div>
              <div>words: {house.words}</div>
            </div>
          ))}
      </div>
      <h1>Characters</h1>
      <p>
        IsSuccess: {characterIsSuccess.toString()}
        <br />
        IsLoading: {characterIsLoading.toString()}
        <button onClick={() => refetch()}>Refetch</button>
      </p>
      <h2>Data</h2>
      <div>
        {characterIsSuccess &&
          characterData.map((character) => (
            <div key={character.id}>
              <div>
                name: {character.name}, nickName: {character.nickName}
              </div>
              <div>
                culture: {character.culture}, nickName: {character.gender}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

const App = () => {
  return (
    <div style={{ padding: "16px" }}>
      <QueryClientProvider client={queryClient}>
        <HookedComponent />
      </QueryClientProvider>
    </div>
  );
};

export default App;
