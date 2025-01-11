import {useState} from 'react';
import get from 'lodash/get';
import {useSelector} from 'react-redux';
import {getDateFromString} from '@/utils/dateUtil.ts';
import {MovieCardData, MovieDetailData} from '@/types/data.ts';
import useFetchData from '@/hooks/useFetchData.ts';
import ENDPOINTS from '@/apis/endpoints.ts';

const useMovieDetail = ({movieId}: {movieId: number}) => {
  const config = useSelector(state =>
    get(state, ['appConfiguration', 'imageConfig', 'mobile'], null),
  );

  const formatMovie = (data: any) => {
    const backdropUrl = get(config, 'backdropUrl', '');
    const posterUrl = get(config, 'posterUrl', '');
    const backdropPath = get(data, 'backdrop_path', '');
    const posterPath = get(data, 'poster_path', '');
    const title = get(data, 'title', '');
    const rating = get(data, 'vote_average', 0);
    const runtime = get(data, 'runtime', 0);
    const tagline = get(data, 'tagline', 0);
    const releaseDate = get(data, 'release_date', '');
    const overview = get(data, 'overview', '');

    return {
      backdropImage: `${backdropUrl}${backdropPath}`,
      posterImage: `${posterUrl}${posterPath}`,
      title: title,
      rating: rating,
      runtime: runtime,
      tagline: tagline,
      releaseYear: getDateFromString(releaseDate).year,
      overview: overview,
    };
  };

  const {data, onRefresh, isRefreshing} = useFetchData<MovieDetailData>({
    path: ENDPOINTS.MOVIES.DETAIL.GET_DETAIL.replace(
      '{movie_id}',
      movieId.toString(),
    ),
    formatData: formatMovie,
    structuredData: 'data',
  });

  return {movie: data, onRefresh, isRefreshing};
};

export default useMovieDetail;
