import React from 'react';
import {FlatList, View} from 'react-native';
import useMovieKeywords from '@/screens/MovieDetail/hooks/useMovieKeywords.ts';
import CText from '@/components/common/CText';
import {IMovieKeyword} from '@/screens/MovieDetail/types.ts';
import CSpacing from '@/assets/styles/spacing.ts';

interface IProps {
  movieId: number;
}

const MovieDetailKeywords = ({movieId}: IProps) => {
  const {keywords} = useMovieKeywords({movieId});

  const renderItem = ({item}: {item: IMovieKeyword}) => {
    return (
      <View key={item.name}>
        <CText.SupportSmRegular>#{item.name}</CText.SupportSmRegular>
      </View>
    );
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          columnGap: CSpacing.xs,
          flexWrap: 'wrap',
        }}>
        {keywords.map(item => renderItem({item}))}
      </View>
    </View>
  );
};

export default MovieDetailKeywords;
