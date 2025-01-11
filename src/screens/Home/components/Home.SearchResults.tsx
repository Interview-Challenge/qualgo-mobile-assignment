import React, {useCallback} from 'react';
import {MovieCardData} from '@/types/data.ts';
import {FlatList, View} from 'react-native';
import SCREEN_NAMES from '@/navigation/screens.ts';
import get from 'lodash/get';
import MovieCard from '@/components/biz/MovieCard';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/navigation/types.ts';
import CSpacing from '@/assets/styles/spacing.ts';
import CText from '@/components/common/CText';
import Localization from '@/utils/localization.ts';
import Colors from '@/assets/colors.ts';
import CFlex from '@/components/layout/CFlex.tsx';
import AppDimensions from '@/assets/styles/dimens.ts';

interface IProps {
  results: MovieCardData[];
  keyword: string;
  onLoadMore: () => void;
}

const gap = (AppDimensions.widthScreen - 2 * CSpacing.m - 3 * 120) / 2;

const HomeSearchResults = ({results, keyword, onLoadMore}: IProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onPressItem = (movie: MovieCardData) => {
    navigation.push(SCREEN_NAMES.MOVIE_DETAIL, {
      movieId: get(movie, 'id', 0),
    });
  };

  const renderItem = useCallback(
    ({item}: {item: MovieCardData; index: number}) => {
      return (
        <MovieCard
          data={item}
          key={`SEARCH_RESULTS_${get(item, 'id', 0)}`}
          onPressMovie={onPressItem}
        />
      );
    },
    [],
  );

  const renderHeader = useCallback(() => {
    return (
      <View
        style={{
          borderLeftWidth: 2,
          borderColor: Colors.primaryIconColor,
          paddingLeft: CSpacing.s,
          marginBottom: CSpacing.s,
        }}>
        <CText.BodyMedium>
          {Localization.t('SEARCH.RESULTS_SEARCH', {keyword: keyword})}
        </CText.BodyMedium>
      </View>
    );
  }, [keyword]);

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      contentContainerStyle={{paddingHorizontal: CSpacing.m, rowGap: gap}}
      data={results}
      columnWrapperStyle={{
        gap: gap,
      }}
      numColumns={3}
      renderItem={renderItem}
      onEndReached={onLoadMore}
    />
  );
};

export default HomeSearchResults;
