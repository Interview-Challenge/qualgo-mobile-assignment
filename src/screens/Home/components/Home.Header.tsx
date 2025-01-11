import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as SolidIcons from 'react-native-heroicons/solid';
import {ICON_SIZE} from '@/assets/styles/images.ts';
import Colors from '@/assets/colors.ts';
import CSpacing from '@/assets/styles/spacing.ts';
import CText from '@/components/common/CText';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <SolidIcons.UserCircleIcon
          size={ICON_SIZE}
          color={Colors.primaryIconColor}
        />
        <CText marginL={'s'}>Hi, Guest</CText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: CSpacing.s,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeHeader;
