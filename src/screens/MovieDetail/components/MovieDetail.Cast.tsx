import React from 'react';
import {View, Image} from 'react-native';
import {ICast} from '@/screens/MovieDetail/types.ts';
import get from 'lodash/get';
import CText from '@/components/common/CText';
import CSpacing from '@/assets/styles/spacing.ts';

interface IProps {
  cast: ICast;
}

const MovieDetailCast = ({cast}: IProps) => {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        columnGap: CSpacing.xs,
      }}>
      <Image
        source={{uri: get(cast, 'profilePath')}}
        style={{width: 40, height: 40, borderRadius: 20}}
      />
      <View>
        <CText.SupportMedium>{get(cast, 'character', '')}</CText.SupportMedium>
        <CText.SupportSmRegular>{get(cast, 'name', '')}</CText.SupportSmRegular>
      </View>
    </View>
  );
};

export default MovieDetailCast;
