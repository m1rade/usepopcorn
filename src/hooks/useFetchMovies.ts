import { useEffect, useState } from 'react';
import { MovieDataType } from '../movieData';
import { IFailedResponse, IServerResponse, ISucceedResponse } from '../types/common';

export const API_KEY = 'b931a86e';

export function useFetchMovies<Q>(query: Q, callback?: (...args: any) => any) {
  const [movies, setMovies] = useState<MovieDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setMovies([]);
        setError('');

        const resp = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=1`);
        if (!resp.ok) {
          throw new Error('Cannot get movies from API');
        }

        const data: IServerResponse = await resp.json();

        let results;
        if (data.Response === 'False') {
          results = data as IFailedResponse;
          throw new Error(results.Error);
        } else {
          results = data as ISucceedResponse;
          setMovies(results.Search);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!query) {
      setError('');
      return;
    }

    callback?.();
    getMovies();
  }, [query]);

  return { movies, isLoading, error };
}
