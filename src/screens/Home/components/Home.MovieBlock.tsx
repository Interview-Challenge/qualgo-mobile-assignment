import React, {useCallback} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import CText from '@/components/common/CText';
import Colors from '@/assets/colors.ts';
import CSpacing from '@/assets/styles/spacing.ts';
import * as SolidIcons from 'react-native-heroicons/solid';
import Localization from '@/utils/localization.ts';
import MovieCard from '@/components/biz/MovieCard';
import {MovieCardData} from '@/types/data.ts';
import get from 'lodash/get';
import {useNavigation} from '@react-navigation/native';
import SCREEN_NAMES from '@/navigation/screens.ts';
import {RootStackParamList} from '@/navigation/types.ts';
import {StackNavigationProp} from '@react-navigation/stack';

interface IHomeMovieBlockProps {
  title: string;
  blockData: MovieCardData[];
}

const HomeMovieBlock = ({title, blockData}: IHomeMovieBlockProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onPressItem = (movie: MovieCardData) => {
    navigation.push(SCREEN_NAMES.MOVIE_DETAIL, {
      movieId: get(movie, 'id', 0),
    });
  };

  const renderItem = useCallback(
    ({item, index}: {item: MovieCardData; index: number}) => {
      return (
        <MovieCard
          data={item}
          key={`${title}_${index}`}
          onPressMovie={onPressItem}
        />
      );
    },
    [title],
  );

  return (
    <View style={{paddingHorizontal: CSpacing.m}}>
      <View style={styles.rowTitle}>
        <View style={styles.titleLeftWrapper}>
          <CText.BodyMedium>{title}</CText.BodyMedium>
        </View>
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
      <FlatList
        horizontal={true}
        data={blockData}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        style={{paddingVertical: CSpacing.m}}
        ItemSeparatorComponent={() => <View style={{width: CSpacing.s}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowTitle: {flexDirection: 'row', justifyContent: 'space-between'},
  titleLeftWrapper: {
    borderLeftWidth: 2,
    borderColor: Colors.primaryIconColor,
    paddingLeft: CSpacing.s,
  },
  titleRightWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeMovieBlock;
