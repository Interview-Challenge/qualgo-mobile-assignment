import axiosInstance from '@/apis/axiosInstance.ts';
import ENDPOINTS from '@/apis/endpoints.ts';

export const getPopularMovies = () =>
  axiosInstance.get(ENDPOINTS.MOVIES.RECOMMENDATION.GET_POPULAR, {
    params: {
      language: 'en-US',
      page: 1,
    },
  });

export const getTopRatedMovies = () =>
  axiosInstance.get(ENDPOINTS.MOVIES.RECOMMENDATION.GET_TOP_RATED, {
    params: {
      language: 'en-US',
      page: 1,
    },
  });

export const getUpcomingMovies = () =>
  axiosInstance.get(ENDPOINTS.MOVIES.RECOMMENDATION.GET_UPCOMING);
