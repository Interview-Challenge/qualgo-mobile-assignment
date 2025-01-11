import React from 'react';
import CSpacing from '@/assets/styles/spacing.ts';
import Colors from '@/assets/colors.ts';
import {View} from 'react-native';
import CText from '@/components/common/CText';
import Localization from '@/utils/localization.ts';

interface IProps {
  overview: string;
}

const MovieDetailOverview = ({overview}: IProps) => {
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
        }}>
        <CText.BodyMedium>{Localization.t('MOVIE.OVERVIEW')}</CText.BodyMedium>
      </View>
      <View style={{marginTop: CSpacing.m}}>
        <CText.BodyRegular color={Colors.neutral_5}>
          {overview}
        </CText.BodyRegular>
      </View>
    </View>
  );
};

export default MovieDetailOverview;
