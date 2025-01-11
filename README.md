# Cinemaster

Discover and explore a vast collection of global movies from themoviedb.org. Easily search for detailed information on any movie, including plot summaries and cast details. Dive into the world of cinema with Cinemaster today!

## Checklist 

- [x] Setup source
- [x] Add navigation
- [x] Add base Home Screen
- [x] Add base Detail Screen
- [x] Search Function

## Usage
### Setup
```
yarn nuke && yarn && yarn pod:install
```

### Run
```
yarn ios
```
or
```
yarn android
```

## Reusable Handler

### `useFetchData`
A custom React hook for fetching and managing data from a given endpoint.

### `useInfinityFetchData`
Custom hook for handling infinite scrolling data fetching with search and refresh capabilities.

### `useUpdateEffect`
A custom hook that functions similarly to the `useEffect` hook but skips
execution on the initial render. This hook ensures that the provided effect
is only executed when any of the values in the `dependencies` array is updated
after the initial mount.
