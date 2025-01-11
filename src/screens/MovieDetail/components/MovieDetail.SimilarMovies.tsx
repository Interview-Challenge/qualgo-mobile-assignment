import React from 'react';
import CSpacing from '@/assets/styles/spacing.ts';
import Colors from '@/assets/colors.ts';
import HomeMovieBlock from '@/screens/Home/components/Home.MovieBlock.tsx';
import Localization from '@/utils/localization.ts';
import {View} from 'react-native';
import useMovieSimilar from '@/screens/MovieDetail/hooks/useMovieSimilar.ts';

interface IProps {
  movieId: number;
}

const MovieDetailSimilarMovies = ({movieId}: IProps) => {
  const {similarMovies} = useMovieSimilar({movieId});
  return (
    <View
      style={{
        paddingVertical: CSpacing.m,
        backgroundColor: Colors.primaryBackgroundColor,
      }}>
      <HomeMovieBlock
        title={Localization.t('MOVIE.SIMILAR_LIST_TITLE')}
        blockData={similarMovies}
      />
    </View>
  );
};

export default MovieDetailSimilarMovies;
