import React from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {ICast} from '@/screens/MovieDetail/types.ts';
import MovieDetailCast from '@/screens/MovieDetail/components/MovieDetail.Cast.tsx';
import CSpacing from '@/assets/styles/spacing.ts';
import Colors from '@/assets/colors.ts';
import CText from '@/components/common/CText';
import Localization from '@/utils/localization.ts';
import useMovieCasts from '@/screens/MovieDetail/hooks/useMovieCasts.ts';
import * as SolidIcons from 'react-native-heroicons/solid';

interface IProps {
  movieId: number;
  limit?: number;
}

const MovieDetailCastList = ({movieId, limit = 5}: IProps) => {
  const {data} = useMovieCasts({movieId: movieId});

  const renderItem = ({item}: {item: ICast}) => {
    return <MovieDetailCast cast={item} />;
  };

  return data.length > 0 ? (
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
          {Localization.t('MOVIE.CASTS')} ({data.length})
        </CText.BodyMedium>
        <Pressable style={styles.titleRightWrapper}>
          <CText.SupportRegular>
            {Localization.t('RECOMMENDATION.SEE_ALL')}
          </CText.SupportRegular>
          <SolidIcons.ChevronRightIcon
            color={Colors.primaryIconColor}
            size={16}
          />
        </Pressable>
      </View>
      <View style={{marginTop: CSpacing.m}}>
        <FlatList
          data={data.slice(0, limit)}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{columnGap: CSpacing.m}}
          horizontal
        />
      </View>
    </View>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  titleRightWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MovieDetailCastList;
