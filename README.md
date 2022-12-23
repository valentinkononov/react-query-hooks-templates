# Getting Onboarded with Reaсt Query Hooks

> React part of this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## What is this

This repository is created as samples for meetup talk with [this presentation](https://slides.com/valentinkononov/react-query-hooks/) - how to use React Query Hooks in web development, in React App.

[Official Documentation](https://tanstack.com/query/v4/docs/overview) 

## Content

* Concept - Basic case - load data, get endpoint
* Getting data
* url, query, body payload
* Work with Hooks in components
* Code splitting
* Caching settings
* What is returned by hook?
* sequential queries
* Mutation samples
* Cache management - Update / Invalidate ids

### Use Case

Nearly every web application uses some data, usually loaded over http from some api. 
Hence, every developer of such application solves standard tasks like:

* load data over http (using fetch or axios or XMLHttpRequest)
* Transform api response into objects, which are better for UI usage
* Track loading process and errors from API - update UI component with circle loader or something similar
* Show data in UI
* Organize calls to update data to API

In simple words - this is server state management task.

In number of cases, developers uses such tools (approaches) as Redux to solve this. But Redux is a client state management approach, which is slightly different and has much more use cases.
Redux is frequently blamed for a huge boilerplate of code for basic actions. Indeed, to address a simple case developer needs to add:

* state definition
* action (for load start, progress, error, completed, data received)
* reducer (same)
* integrate to components with `useSelector` and `useReducer` or similar.
* ...

This is quite a long approach for straightforward use case. I have always thought there should be something simple and readable for simple use cases

### React Query Hooks (RQ)

According to [Official Documentation](https://tanstack.com/query/v4/docs/overview), RQ is designed exactly to address server state management use case, described above.
RQ Hooks, as followed by name, are based on hooks. It means, that after integration into the component, it would rerender after each change (including change of loading status or error).

> all samples are added in TS

Basic hook to get data can look like this:

```typescript
import { useQuery } from "react-query";

// calling http
export const getAll = async (): Promise<any> => {
    const { data } = await axios.get(`url`);
    return data;
};

// hook definition
export const useServerData = (): UseQueryResult<Entity[]> =>
    useQuery(['entity', 'cache', 'id'], () => getAll());
```

After that hook can be easily added into the component:

```typescript
export const HookedComponent = () => {
  const { data, isLoading, isSuccess } = useServerData();

  return (
    <>
      <h1>Data</h1>
      <div>IsLoading: {isLoading.toString()}</div>
      <div>
        {isSuccess &&
          data.map((item) => <div key={item.id}>name: {item.name}</div>)}
      </div>
    </>
  );
};
```

Of course, this is not the final step. We should also include component into some kind of scope for all hooks. Something which can track cache and handle rendering triggers.

```typescript
import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <HookedComponent />
      </QueryClientProvider>
    </div>
  );
};
```

Defining of queryClient is usually done on a top level of all components, but of course developer can define several scopes for such hooks and have several queryClients for different app modules.

> Code in this repository has more details in samples

### Capabilities

Among all tools of RQ hooks, I would like to mention following things to use.

* cache time setup: provide options object to `useQuery` hook with `staleTime` definition
* hook accepts `enabled` property as options field to manage when hooks works

> this tool is very useful to handle multiple dependent queries. Check out [here](./src/App.tsx)

* hook returns `data` and number of flags like: `isLoading`, `isError` and others...
* Mapping and transformation can be implemented as `select` function in [query](./src/query/game-of-thrones/house.query.ts)
* cache works for queryFunction. But `select` is called on every render, so it makes sense to wrap it with `useCallback` or `useMemo`

### More - in meetup talk! Take care!