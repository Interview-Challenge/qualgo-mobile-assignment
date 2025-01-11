import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

const AppDimensions = {
  widthScreen: width,
  heightScreen: height,
};

export default AppDimensions;
