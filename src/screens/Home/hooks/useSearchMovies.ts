import {useSelector} from 'react-redux';
import get from 'lodash/get';
import {useCallback} from 'react';
import {MovieCardData} from '@/types/data.ts';
import {getDateFromString} from '@/utils/dateUtil.ts';
import useInfinityFetchData from '@/hooks/useInfinityFetchData.ts';
import ENDPOINTS from '@/apis/endpoints.ts';

const useSearchMovies = () => {
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

  const {data, keyword, onChangeKeyword, onLoadMore} =
    useInfinityFetchData<MovieCardData>({
      path: ENDPOINTS.SEARCH.MOVIE,
      formatData: formatMovieCardDataList,
    });

  return {
    searchResults: data,
    keyword,
    onChangeKeyword,
    onLoadMore,
  };
};

export default useSearchMovies;
