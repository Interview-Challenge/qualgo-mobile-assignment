import React, {useCallback} from 'react';
import CFlex from '@/components/layout/CFlex.tsx';
import HomeHeader from '@/screens/Home/components/Home.Header.tsx';
import CSearchInput from '@/components/common/CSearchInput';
import CSpacing from '@/assets/styles/spacing.ts';
import {FlatList, StyleSheet} from 'react-native';
import useMovieBlockRequest, {
  BLOCK_TYPE,
} from '@/screens/Home/hooks/useMovieBlockRequest.ts';
import Localization from '@/utils/localization.ts';
import HomeMovieBlock from '@/screens/Home/components/Home.MovieBlock.tsx';
import get from 'lodash/get';
import HomeSearchResults from '@/screens/Home/components/Home.SearchResults.tsx';
import useSearchMovies from '@/screens/Home/hooks/useSearchMovies.ts';

const HOME_LAYOUT = [
  BLOCK_TYPE.UPCOMING,
  BLOCK_TYPE.TOP_RATED,
  BLOCK_TYPE.POPULAR,
];

const Home = () => {
  const {data} = useMovieBlockRequest();
  const {searchResults, keyword, onChangeKeyword, onLoadMore} =
    useSearchMovies();

  const renderLayout = useCallback(
    ({item}: {item: string}) => {
      switch (item) {
        case BLOCK_TYPE.TOP_RATED: {
          return (
            <HomeMovieBlock
              key={`BLOCK_${item}`}
              title={Localization.t('RECOMMENDATION.TOP_RATED')}
              blockData={get(data, item, [])}
            />
          );
        }

        case BLOCK_TYPE.UPCOMING: {
          return (
            <HomeMovieBlock
              key={`BLOCK_${item}`}
              title={Localization.t('RECOMMENDATION.UPCOMING')}
              blockData={get(data, item, [])}
            />
          );
        }

        case BLOCK_TYPE.POPULAR: {
          return (
            <HomeMovieBlock
              key={`BLOCK_${item}`}
              title={Localization.t('RECOMMENDATION.POPULAR')}
              blockData={get(data, item, [])}
            />
          );
        }

        default: {
          return null;
        }
      }
    },
    [data],
  );

  return (
    <CFlex>
      <HomeHeader />
      <CSearchInput
        style={styles.searchInputContainer}
        placeholder={Localization.t('SEARCH.INPUT_PLACEHOLDER')}
        onChangeText={onChangeKeyword}
      />
      {!keyword ? (
        <FlatList
          data={HOME_LAYOUT}
          renderItem={renderLayout}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <HomeSearchResults
          results={searchResults}
          keyword={keyword}
          onLoadMore={onLoadMore}
        />
      )}
    </CFlex>
  );
};

const styles = StyleSheet.create({
  searchInputContainer: {
    marginHorizontal: CSpacing.m,
    marginVertical: CSpacing.s,
  },
});

export default Home;
