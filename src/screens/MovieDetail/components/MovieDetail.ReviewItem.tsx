import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {IReview} from '@/screens/MovieDetail/types.ts';
import get from 'lodash/get';
import CText from '@/components/common/CText';
import CSpacing from '@/assets/styles/spacing.ts';
import Colors from '@/assets/colors.ts';
import Localization from '@/utils/localization.ts';
import Avatar from '@/components/biz/Avatar';
import * as SolidIcons from 'react-native-heroicons/solid';

interface IProps {
  review: IReview;
}

const MovieDetailReviewItem = ({review}: IProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const content = useMemo(() => {
    if (isExpanded) {
      return get(review, 'content', '');
    }

    return get(review, 'content', '').slice(0, 150) + '...';
  }, [review, isExpanded]);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            columnGap: CSpacing.xs,
            alignItems: 'center',
          }}>
          <Avatar
            path={get(review, 'avatarPath')}
            altText={get(review, 'name')}
          />
          <View>
            <CText.SupportMedium>{get(review, 'name')}</CText.SupportMedium>
            <CText.SupportSmRegular>
              {get(review, 'username')}
            </CText.SupportSmRegular>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: CSpacing.xxs,
          }}>
          <SolidIcons.StarIcon color={Colors.warning_4} size={12} />
          <CText.SupportRegular>
            {get(review, 'rating', '')}/10
          </CText.SupportRegular>
        </View>
      </View>
      <View style={{marginTop: CSpacing.xs}}>
        <CText.SupportRegular>
          {content}
          <CText.SupportRegular
            color={Colors.primaryIconColor}
            onPress={setIsExpanded.bind(null, !isExpanded)}>
            {Localization.t(isExpanded ? 'MOVIE.COLLAPSE' : 'MOVIE.EXPAND')}
          </CText.SupportRegular>
        </CText.SupportRegular>
      </View>
    </View>
  );
};

export default MovieDetailReviewItem;
