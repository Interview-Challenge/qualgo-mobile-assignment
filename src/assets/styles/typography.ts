import FontSize from '@/assets/styles/fontsize.ts';

export type TypographyType = keyof typeof Typography;

export const getFontFamilyFromProps = (
  typo: TypographyType = 'body_regular',
) => {
  return Typography[typo] || Typography.body_regular;
};

const Typography = {
  h1: {
    fontSize: FontSize.h1,
    fontFamily: 'Poppins-SemiBold',
  },
  h2: {
    fontSize: FontSize.h2,
    fontFamily: 'Poppins-SemiBold',
  },
  h3: {
    fontSize: FontSize.h3,
    fontFamily: 'Poppins-SemiBold',
  },
  h4: {
    fontSize: FontSize.h4,
    fontFamily: 'Poppins-SemiBold',
  },
  h5: {
    fontSize: FontSize.h5,
    fontFamily: 'Poppins-Medium',
  },
  body_regular: {
    fontSize: FontSize.body,
    fontFamily: 'Poppins-Regular',
  },
  body_medium: {
    fontSize: FontSize.body,
    fontFamily: 'Poppins-Medium',
  },
  body_semibold: {
    fontSize: FontSize.body,
    fontFamily: 'Poppins-SemiBold',
  },
  support_regular: {
    fontSize: FontSize.support_regular,
    fontFamily: 'Poppins-Regular',
  },
  support_medium: {
    fontSize: FontSize.support_regular,
    fontFamily: 'Poppins-Medium',
  },
  support_small_regular: {
    fontSize: FontSize.support_small,
    fontFamily: 'Poppins-Regular',
  },
  support_small_medium: {
    fontSize: FontSize.support_small,
    fontFamily: 'Poppins-Medium',
  },
};

export default Typography;
