import {createSlice} from '@reduxjs/toolkit';
import get from 'lodash/get';

interface RecommendationState {
  [key: string]: any;
}

const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState: {} as RecommendationState,
  reducers: {
    updateRecommendation: (state, action) => {
      const type = get(action, 'payload.type', '');
      const data = get(action, 'payload.data', '');
      if (type) {
        state[type] = data;
      }
    },

    resetAll: state => {
      state = {};
    },
  },
});

export const {updateRecommendation, resetAll} = recommendationSlice.actions;
export default recommendationSlice.reducer;
