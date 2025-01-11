import {MovieCardData} from '@/types/data.ts';
import {formatMovieCardDataList} from '@/utils/movieUtil.ts';
import ENDPOINTS from '@/apis/endpoints.ts';
import useInfinityFetchData from '@/hooks/useInfinityFetchData.ts';

interface IProps {
  movieId: number;
}

const useMovieSimilar = ({movieId}: IProps) => {
  const {data} = useInfinityFetchData<MovieCardData>({
    path: ENDPOINTS.MOVIES.DETAIL.GET_SIMILAR.replace(
      '{movie_id}',
      movieId.toString(),
    ),
    formatData: formatMovieCardDataList,
  });

  return {similarMovies: data};
};

export default useMovieSimilar;
