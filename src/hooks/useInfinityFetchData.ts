import {useCallback, useEffect, useState} from 'react';
import axiosInstance from '@/apis/axiosInstance.ts';
import get from 'lodash/get';
import {debounce} from 'lodash';
import useUpdateEffect from '@/hooks/useUpdateEffect.ts';

interface IProps {
  path: string;
  formatData?: (data: any[]) => any;
  limit?: number;
}

/**
 * Custom hook for handling infinite scrolling data fetching with search and refresh capabilities.
 *
 * @template T
 * @param {IProps} props - Configuration object containing the API path, data formatting function, and optional pagination limit.
 * @param {string} props.path - The API endpoint to fetch data from.
 * @param {function} [props.formatData] - Function to transform or format the fetched data, defaults to returning the data as-is.
 * @param {number} [props.limit=12] - Number of items to fetch per request, default is 12.
 *
 * @returns {Object} - An object containing the following properties and methods:
 * @property {Array<T>} data - The accumulated list of fetched data.
 * @property {number} totalResults - The total number of results available from the API response.
 * @property {boolean} isLoading - Indicates if data is currently being loaded.
 * @property {boolean} isRefreshing - Indicates if the refresh action is in progress.
 * @property {boolean} isSearching - Indicates if data is being filtered based on a search keyword.
 * @property {string} keyword - The current search keyword.
 * @property {function} onLoadMore - Function to fetch the next page of data.
 * @property {function} onRefresh - Function to refresh the data and reset pagination.
 * @property {function} onChangeKeyword - Debounced function to update the search keyword and re-fetch data accordingly.
 */
const useInfinityFetchData = <T>(props: IProps) => {
  const {path, formatData = values => values, limit = 12} = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>('');
  const [data, setData] = useState<T[]>([]);

  const _getData = useCallback(
    (currentPage: number = 1) => {
      axiosInstance
        .get(path, {params: {page: currentPage, query: keyword, limit}})
        .then(response => {
          const results = get(response, 'data.results', []);
          const limitPage = get(response, 'data.total_pages', 1);
          if (currentPage < limitPage) {
            setPage(currentPage + 1);
          }

          if (currentPage === 0) {
            setData(formatData(results));
          } else {
            setData(prev => prev.concat(formatData(results)));
          }

          setTotalResults(get(response, 'data.total_results', 1));
          setTotalPages(limitPage);
        })
        .catch(error => {
          console.log('error', error);
        })

        .finally(() => {
          setIsLoading(false);
          setIsRefreshing(false);
          setIsSearching(false);
        });
    },
    [path, keyword, limit, formatData],
  );

  const onLoadMore = useCallback(() => {
    if (page < totalPages) {
      _getData(page);
    }
  }, [_getData, totalPages, page]);

  const onRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
    _getData();
  };

  const onChangeKeyword = (text: string) => {
    setPage(1);
    setKeyword(text);
  };

  const onChangeKeywordDebounce = debounce(onChangeKeyword, 400);

  useUpdateEffect(() => {
    _getData();
  }, [keyword]);

  useEffect(() => {
    _getData();
  }, []);

  return {
    data,
    totalResults,
    isLoading,
    isRefreshing,
    onLoadMore,
    onRefresh,
    onChangeKeyword: onChangeKeywordDebounce,
    keyword,
    isSearching,
  };
};

export default useInfinityFetchData;
