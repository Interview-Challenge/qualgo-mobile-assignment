import get from 'lodash/get';

export const getDateFromString = (dateString: string) => {
  const parts = dateString.split('-');
  return {
    year: get(parts, [0], ''),
    month: get(parts, [1], ''),
    day: get(parts, [2], ''),
  };
};
