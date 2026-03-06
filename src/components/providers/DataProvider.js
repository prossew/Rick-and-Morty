import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    gender: '',
    type: ''
  });

  const buildURL = useCallback((filtersObj, page = 1) => {
    const params = new URLSearchParams({ page });
    Object.entries(filtersObj).forEach(([key, val]) => {
      if (val) params.set(key, val);
    });

    return `${API_URL}?${params.toString()}`;
  }, []);

  const [apiURL, setApiURL] = useState(() => buildURL({}, 1));

  const fetchData = useCallback(async (url) => {
    setIsFetching(true);
    setIsError(false);

    try {
      const { data } = await axios.get(url);
      setCharacters(data.results);
      setInfo(data.info);
    } catch (e) {
      setIsError(true);
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL, fetchData]);

  const applyFilters = useCallback(
    (newFilters) => {
      setActivePage(0);
      setFilters(newFilters);
      setApiURL(buildURL(newFilters, 1));
    },
    [buildURL]
  );

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      isFetching,
      isError,
      info,
      filters,
      applyFilters
    }),
    [
      activePage,
      apiURL,
      characters,
      isFetching,
      isError,
      info,
      filters,
      applyFilters
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
