import React, {useRef} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/navigation/types.ts';
import SCREEN_NAMES from '@/navigation/screens.ts';
import useMovieDetail from '@/screens/MovieDetail/hooks/useMovieDetail.ts';
import get from 'lodash/get';
import CFlex from '@/components/layout/CFlex.tsx';
import CSpacing from '@/assets/styles/spacing.ts';
import CRadius from '@/assets/styles/radius.ts';
import CText from '@/components/common/CText';
import * as SolidIcons from 'react-native-heroicons/solid';
import Colors from '@/assets/colors.ts';
import Localization from '@/utils/localization.ts';
import LinearGradient from 'react-native-linear-gradient';
import MovieDetailHeader from '@/screens/MovieDetail/components/MovieDetail.Header.tsx';
import MovieDetailCastList from '@/screens/MovieDetail/components/MovieDetail.CastList.tsx';
import MovieDetailReviews from '@/screens/MovieDetail/components/MovieDetail.Reviews.tsx';
import MovieDetailSimilarMovies from '@/screens/MovieDetail/components/MovieDetail.SimilarMovies.tsx';
import MovieDetailOverview from '@/screens/MovieDetail/components/MovieDetail.Overview.tsx';
import MovieDetailInformation from '@/screens/MovieDetail/components/MovieDetail.Information.tsx';

const MovieDetail = () => {
  const {width} = useWindowDimensions();
  const {
    params: {movieId},
  } = useRoute<RouteProp<RootStackParamList, SCREEN_NAMES.MOVIE_DETAIL>>();

  const {movie, onRefresh, isRefreshing} = useMovieDetail({
    movieId: movieId,
  });

  const scrollY = useRef(new Animated.Value(0)).current;

  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['transparent', Colors.primaryBackgroundColor],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false}, // because backgroundColor cannot be animated natively
  );
  return movie ? (
    <>
      <ImageBackground
        source={{uri: get(movie, 'backdropImage', '')}}
        imageStyle={{
          width: width,
          minHeight: (width * 9) / 16,
          resizeMode: 'contain',
        }}
      />
      <LinearGradient
        locations={[0.1, 0.35]}
        colors={['transparent', Colors.primaryBackgroundColor]}
        style={{flex: 1}}>
        <MovieDetailHeader
          title={get(movie, 'title', '')}
          backgroundColor={backgroundColor}
          titleOpacity={titleOpacity}
        />
        <CFlex
          scrollable
          onScroll={onScroll}
          onRefresh={onRefresh}
          isRefreshing={isRefreshing}>
          <MovieDetailInformation movie={movie} movieId={movieId} />
          <MovieDetailOverview overview={get(movie, 'overview', '')} />
          <MovieDetailCastList movieId={movieId} />
          <MovieDetailReviews movieId={movieId} limit={3} />
          <MovieDetailSimilarMovies movieId={movieId} />
          <View style={{height: 100}} />
        </CFlex>
      </LinearGradient>
    </>
  ) : null;
};

export default MovieDetail;
