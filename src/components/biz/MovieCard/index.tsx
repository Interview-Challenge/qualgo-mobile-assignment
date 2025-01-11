import React, {useCallback} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {MovieCardData} from '@/types/data.ts';
import get from 'lodash/get';
import CText from '@/components/common/CText';
import CRadius from '@/assets/styles/radius.ts';
import Colors from '@/assets/colors.ts';
import CSpacing from '@/assets/styles/spacing.ts';
import * as SolidIcons from 'react-native-heroicons/solid';

interface IMovieCardProps {
  data: MovieCardData;
  onPressMovie: (data: MovieCardData) => void;
}

const MovieCard = ({data, onPressMovie}: IMovieCardProps) => {
  const onPress = useCallback(() => {
    onPressMovie(data);
  }, [onPressMovie, data]);

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image
        source={{uri: get(data, 'thumbnail', '')}}
        style={styles.poster}
        resizeMode={'cover'}
      />
      <View style={styles.movieInfo}>
        <CText.SupportMedium style={{flex: 1}}>
          {get(data, 'title', '')}
        </CText.SupportMedium>
        <View style={styles.ratingAndReleaseYear}>
          <CText.SupportRegular>{get(data, 'year', '')}</CText.SupportRegular>
          <View style={styles.rating}>
            <SolidIcons.StarIcon color={Colors.warning_4} size={12} />
            <CText.SupportRegular>
              {get(data, 'rating', '')}
            </CText.SupportRegular>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 120,
    borderRadius: CRadius.l,
    backgroundColor: Colors.movieCardBackgroundColor,
    overflow: 'hidden',
  },
  poster: {width: 120, height: 160},
  movieInfo: {
    padding: CSpacing.s,
    flex: 1,
  },
  ratingAndReleaseYear: {flexDirection: 'row', justifyContent: 'space-between'},
  rating: {flexDirection: 'row', alignItems: 'center'},
});

export default MovieCard;
