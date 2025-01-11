import React from 'react';
import CSpacing from '@/assets/styles/spacing.ts';
import {Image, StyleSheet, View} from 'react-native';
import get from 'lodash/get';
import CRadius from '@/assets/styles/radius.ts';
import CText from '@/components/common/CText';
import Colors from '@/assets/colors.ts';
import * as SolidIcons from 'react-native-heroicons/solid';
import Localization from '@/utils/localization.ts';
import {MovieDetailData} from '@/types/data.ts';
import MovieDetailKeywords from '@/screens/MovieDetail/components/MovieDetail.Keywords.tsx';

interface IProps {
  movie: MovieDetailData;
  movieId: number;
}

const MovieDetailInformation = ({movie, movieId}: IProps) => {
  return (
    <View style={{flexDirection: 'row', paddingHorizontal: CSpacing.m}}>
      <Image
        source={{uri: get(movie, 'posterImage', '')}}
        style={{
          overflow: 'hidden',
          width: 120,
          height: 160,
          resizeMode: 'cover',
          borderRadius: CRadius.l,
        }}
      />
      <View style={{flex: 1, paddingLeft: CSpacing.m}}>
        <CText.H5>
          {get(movie, 'title', '')} ({get(movie, 'releaseYear', '')})
        </CText.H5>
        <CText.SupportRegular color={Colors.neutral_4}>
          {get(movie, 'tagline', '')}
        </CText.SupportRegular>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.rating}>
            <SolidIcons.StarIcon color={Colors.warning_4} size={12} />
            <CText.SupportRegular>
              {get(movie, 'rating', '')}
            </CText.SupportRegular>
          </View>
        </View>
        <CText.SupportMedium color={Colors.neutral_5}>
          {Localization.t('MOVIE.RUNTIME', {
            time: get(movie, 'runtime', ''),
          })}
        </CText.SupportMedium>
        <MovieDetailKeywords movieId={movieId} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rating: {flexDirection: 'row', alignItems: 'center'},
});

export default MovieDetailInformation;
