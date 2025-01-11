import React from 'react';
import CSpacing from '@/assets/styles/spacing.ts';
import Colors from '@/assets/colors.ts';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import CText from '@/components/common/CText';
import Localization from '@/utils/localization.ts';
import useMovieReviews from '@/screens/MovieDetail/hooks/useMovieReviews.ts';
import {IReview} from '@/screens/MovieDetail/types.ts';
import MovieDetailReviewItem from '@/screens/MovieDetail/components/MovieDetail.ReviewItem.tsx';
import * as SolidIcons from 'react-native-heroicons/solid';

interface IProps {
  movieId: number;
  limit?: number;
}

const MovieDetailReviews = ({movieId, limit = 5}: IProps) => {
  const {reviews, totalReviews} = useMovieReviews({
    movieId: movieId,
  });

  const renderItem = ({item}: {item: IReview}) => {
    return <MovieDetailReviewItem review={item} />;
  };

  return (
    <View
      style={{
        paddingTop: CSpacing.m,
        paddingHorizontal: CSpacing.m,
        backgroundColor: Colors.primaryBackgroundColor,
      }}>
      <View
        style={{
          borderLeftWidth: 2,
          borderColor: Colors.primaryIconColor,
          paddingLeft: CSpacing.s,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <CText.BodyMedium>
          {Localization.t('MOVIE.REVIEWS')} ({totalReviews})
        </CText.BodyMedium>
        {totalReviews > limit && (
          <Pressable style={styles.titleRightWrapper}>
            <CText.SupportRegular>
              {Localization.t('RECOMMENDATION.SEE_ALL')}
            </CText.SupportRegular>
            <SolidIcons.ChevronRightIcon
              color={Colors.primaryIconColor}
              size={16}
            />
          </Pressable>
        )}
      </View>
      <View style={{marginTop: CSpacing.m}}>
        <FlatList
          scrollEnabled={false}
          data={reviews.slice(0, limit)}
          renderItem={renderItem}
          keyExtractor={item => item?.id?.toString()}
          ItemSeparatorComponent={() => <View style={{height: CSpacing.m}} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleRightWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MovieDetailReviews;
