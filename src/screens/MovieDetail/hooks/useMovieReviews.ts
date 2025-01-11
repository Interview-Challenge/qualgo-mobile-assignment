import useInfinityFetchData from '@/hooks/useInfinityFetchData.ts';
import ENDPOINTS from '@/apis/endpoints.ts';
import get from 'lodash/get';
import {useSelector} from 'react-redux';
import {IReview} from '@/screens/MovieDetail/types.ts';

const useMovieReviews = ({movieId}: {movieId: number}) => {
  const config = useSelector(state =>
    get(state, ['appConfiguration', 'imageConfig', 'mobile'], null),
  );

  const profileUrl = get(config, 'profileUrl', '');

  const formatData = (data: any[]) => {
    return data.map((review: any) => {
      const avatarPath = get(review, 'author_details.avatar_path', '');
      return {
        id: get(review, 'id', ''),
        name:
          get(review, 'author_details.name', '') ||
          get(review, 'author_details.username', ''),
        username: `@${get(review, 'author_details.username', '')}`,
        avatarPath: avatarPath ? `${profileUrl}${avatarPath}` : '',
        content: get(review, 'content', ''),
        createdAt: get(review, 'created_at', ''),
        rating: get(review, 'author_details.rating', 0),
      };
    });
  };

  const {data, totalResults} = useInfinityFetchData<IReview>({
    path: ENDPOINTS.MOVIES.DETAIL.GET_REVIEWS.replace(
      '{movie_id}',
      movieId.toString(),
    ),
    formatData: formatData,
  });

  return {
    reviews: data,
    totalReviews: totalResults,
  };
};

export default useMovieReviews;
