import SCREEN_NAMES from './screens.ts';

export type RootStackParamList = {
  [SCREEN_NAMES.HOME]: undefined;
  [SCREEN_NAMES.MOVIE_DETAIL]: {movieId: number};
};
