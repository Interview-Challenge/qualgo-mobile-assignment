import {useCallback, useEffect} from 'react';
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '@/services/recommendation.ts';
import get from 'lodash/get';
import {useDispatch, useSelector} from 'react-redux';
import {updateRecommendation} from '@/stores/recommendationSlice';
import {MovieCardData} from '@/types/data.ts';
import {getDateFromString} from '@/utils/dateUtil.ts';

export const BLOCK_TYPE = {
  UPCOMING: 'UPCOMING',
  POPULAR: 'POPULAR',
  TOP_RATED: 'TOP_RATED',
};

const useMovieBlockRequest = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => get(state, ['recommendation'], []));
  const config = useSelector(state =>
    get(state, ['appConfiguration', 'imageConfig', 'mobile'], null),
  );

  const formatMovieCardDataList = useCallback(
    (list: any): MovieCardData[] => {
      return list.map((item: any) => ({
        title: get(item, 'title', ''),
        rating: get(item, 'vote_average', 0),
        thumbnail: `${get(config, 'posterUrl', '')}${get(
          item,
          'poster_path',
          '',
        )}`,
        year: getDateFromString(get(item, 'release_date', '')).year,
        id: get(item, 'id', 0),
      }));
    },
    [config],
  );

  const getData = () => {
    const executions = [
      getUpcomingMovies(),
      getPopularMovies(),
      getTopRatedMovies(),
    ];

    Promise.allSettled(executions)
      .then(responses => {
        const upcomingMovies = get(
          responses,
          [0, 'value', 'data', 'results'],
          [],
        );

        const popularMovies = get(
          responses,
          [1, 'value', 'data', 'results'],
          [],
        );

        const topRatedMovies = get(
          responses,
          [2, 'value', 'data', 'results'],
          [],
        );

        dispatch(
          updateRecommendation({
            type: BLOCK_TYPE.POPULAR,
            data: formatMovieCardDataList(popularMovies),
          }),
        );
        dispatch(
          updateRecommendation({
            type: BLOCK_TYPE.UPCOMING,
            data: formatMovieCardDataList(upcomingMovies),
          }),
        );
        dispatch(
          updateRecommendation({
            type: BLOCK_TYPE.TOP_RATED,
            data: formatMovieCardDataList(topRatedMovies),
          }),
        );
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    if (config) {
      getData();
    }
  }, [config]);

  return {data};
};

export default useMovieBlockRequest;
