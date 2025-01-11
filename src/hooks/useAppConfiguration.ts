import {useCallback, useEffect} from 'react';
import {getConfiguration} from '@/services/imageConfiguration.ts';
import get from 'lodash/get';
import {updateConfig} from '@/stores/appConfigurationSlice.ts';
import {useDispatch} from 'react-redux';
import {convertImageConfig} from '@/utils/configUtil.ts';

const useAppConfiguration = () => {
  const dispatch = useDispatch();
  const getConfig = useCallback(() => {
    getConfiguration()
      .then(response => {
        const data = get(response, 'data', null);
        const imageConfig = get(data, 'images', null);
        dispatch(updateConfig(convertImageConfig(imageConfig)));
      })
      .catch(() => {});
  }, [dispatch]);

  useEffect(() => {
    getConfig();
  }, [getConfig]);
};

export default useAppConfiguration;
