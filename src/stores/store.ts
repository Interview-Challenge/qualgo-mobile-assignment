import {combineReducers, configureStore} from '@reduxjs/toolkit';
import recommendationReducer from '@/stores/recommendationSlice';
import appConfigurationReducer from '@/stores/appConfigurationSlice';

export default configureStore({
  reducer: combineReducers({
    recommendation: recommendationReducer,
    appConfiguration: appConfigurationReducer,
  }),
});
