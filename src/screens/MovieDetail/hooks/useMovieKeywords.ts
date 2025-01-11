import useFetchData from '@/hooks/useFetchData.ts';
import {IMovieKeyword} from '@/screens/MovieDetail/types.ts';
import ENDPOINTS from '@/apis/endpoints.ts';

interface IProps {
  movieId: number;
}

const useMovieKeywords = ({movieId}: IProps) => {
  const {data} = useFetchData<IMovieKeyword[]>({
    path: ENDPOINTS.MOVIES.DETAIL.GET_KEYWORDS.replace(
      '{movie_id}',
      movieId.toString(),
    ),
    structuredData: 'data.keywords',
  });

  return {keywords: data || []};
};

export default useMovieKeywords;
