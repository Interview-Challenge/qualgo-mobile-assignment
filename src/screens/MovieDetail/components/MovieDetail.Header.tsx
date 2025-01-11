import React from 'react';
import {TouchableOpacity, Animated} from 'react-native';
import * as SolidIcons from 'react-native-heroicons/solid';
import Colors from '@/assets/colors.ts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CSpacing from '@/assets/styles/spacing.ts';
import CText from '@/components/common/CText';
import {useNavigation} from '@react-navigation/native';
import AnimatedInterpolation = Animated.AnimatedInterpolation;

interface IMovieDetailHeaderProps {
  backgroundColor: AnimatedInterpolation<string | number>;
  title: string;
  titleOpacity: AnimatedInterpolation<number>;
}

// TODO: Temporary. Need to handle from RootNavigation
const MovieDetailHeader = ({
  backgroundColor,
  title,
  titleOpacity,
}: IMovieDetailHeaderProps) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <Animated.View
      style={{
        paddingTop: insets.top + CSpacing.m,
        paddingBottom: CSpacing.m,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor,
      }}>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={{
          borderRadius: 25,
          padding: CSpacing.xs,
        }}>
        <SolidIcons.ChevronLeftIcon color={Colors.primaryIconColor} />
      </TouchableOpacity>
      {/* @ts-ignore */}
      <Animated.Text style={{opacity: titleOpacity}}>
        <CText.H5>{title}</CText.H5>
      </Animated.Text>
      <TouchableOpacity
        style={{
          borderRadius: 25,
          padding: CSpacing.xs,
        }}>
        <SolidIcons.HeartIcon color={Colors.primaryIconColor} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MovieDetailHeader;
