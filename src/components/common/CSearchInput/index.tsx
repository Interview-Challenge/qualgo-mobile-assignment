import React, {useCallback, useMemo, useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  ViewProps,
  TextInputProps,
} from 'react-native';
import Localization from '@/utils/localization.ts';
import Colors from '@/assets/colors.ts';
import CSpacing from '@/assets/styles/spacing.ts';
import {ICON_SIZE} from '@/assets/styles/images.ts';
import * as SolidIcons from 'react-native-heroicons/solid';
import Typography from '@/assets/styles/typography.ts';

export interface ICSearchInputProps
  extends ViewProps,
    Omit<TextInputProps, 'style'> {
  placeholder: string;
}

const CSearchInput = (props: ICSearchInputProps) => {
  const {
    placeholder = Localization.t('SEARCH.INPUT_PLACEHOLDER'),
    style,
    onChangeText,
  } = props;

  const [value, setValue] = useState('');
  const [isFocused, setFocused] = useState(false);

  const containerStyle = StyleSheet.flatten([
    styles.wrapper,
    {borderColor: isFocused ? Colors.primaryIconColor : Colors.neutral_7},
    style,
  ]);

  const isShowClearIcon = isFocused && value;
  const RightIcon = useMemo(() => {
    return isFocused && value
      ? SolidIcons.XCircleIcon
      : SolidIcons.MagnifyingGlassIcon;
  }, [isFocused, value]);

  const onChange = (text: string) => {
    setValue(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const onPressRightIcon = useCallback(() => {
    if (isShowClearIcon) {
      onChange('');
    }
  }, [isShowClearIcon]);

  return (
    <View style={containerStyle}>
      <TextInput
        onFocus={() => setFocused(true)}
        placeholder={placeholder}
        onBlur={() => setFocused(false)}
        onChangeText={onChange}
        value={value}
        placeholderTextColor={Colors.neutral_7}
        style={styles.inputStyle}
      />
      <RightIcon
        size={ICON_SIZE}
        color={Colors.primaryIconColor}
        onPress={onPressRightIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 30,
    paddingVertical: CSpacing.xs,
    paddingHorizontal: CSpacing.m,
    borderWidth: 1,
    flexDirection: 'row',
  },
  inputStyle: {
    flex: 1,
    color: Colors.primaryTextColor,
    ...Typography.body_regular,
  },
});

export default CSearchInput;
