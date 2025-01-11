import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation.tsx';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CAlertProvider from '@/components/common/CAlert';
import {Provider} from 'react-redux';
import store from '@/stores/store.ts';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigation />
          <CAlertProvider />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
