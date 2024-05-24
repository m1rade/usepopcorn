import { useEffect, useState } from 'react';
import { API_KEY } from '../hooks/useFetchMovies';
import { WatchedMovieType } from '../movieData';
import { IFailedResponse, IMovie, IServerResponse } from '../types/common';
import { Button } from './Button';
import { ErrorMessage } from './ErrorMessage';
import { Loader } from './Loader';
import { MovieLg } from './MovieLg';
import { StarRating } from './StarRating';
import { useListenKey } from '../hooks/useListenKey';

export function MovieInfo({
  movieID,
  watchedMovies,
  onClose,
  onAddWatchedMovie,
  onChangeUserRating,
}: {
  movieID: string;
  watchedMovies: WatchedMovieType[];
  onClose: () => void;
  onAddWatchedMovie?: (movie: WatchedMovieType) => void;
  onChangeUserRating?: (rating: number, movieID: string) => void;
}) {
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [userRating, setUserRating] = useState(0);
  const isListed = watchedMovies.map(w => w.imdbID).includes(movieID);
  const watchedMovie = watchedMovies.find(w => w.imdbID === movieID);

  const maxRating = 10;
  const starSize = 25;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddWatchedMovie = () => {
    if (!onAddWatchedMovie || !movie) return;

    const numRuntime = parseInt(movie.Runtime.split(' ')[0]);
    const newWatchedMovie: WatchedMovieType = {
      imdbID: movie.imdbID,
      imdbRating: Number(movie.imdbRating),
      Poster: movie.Poster,
      Title: movie.Title,
      Year: movie.Year,
      runtime: isNaN(numRuntime) ? 0 : numRuntime,
      userRating,
    };

    onAddWatchedMovie(newWatchedMovie);
  };

  const handleOnSetRating = (rating: number) => {
    if (isListed && watchedMovie) {
      onChangeUserRating && onChangeUserRating(rating, watchedMovie.imdbID);
    }
    setUserRating(rating);
  };

  useEffect(() => {
    const getMovieById = async () => {
      try {
        setIsLoading(true);
        setError('');
        setMovie(null);
        setUserRating(0);

        const resp = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieID}`);
        if (!resp.ok) throw new Error('Cannot get movie info');

        const data: IServerResponse = await resp.json();

        let results;
        if (data.Response === 'False') {
          results = data as IFailedResponse;
          throw new Error(results.Error);
        } else {
          results = data as IMovie;
          setMovie(results);

          if (watchedMovie) {
            setUserRating(watchedMovie.userRating);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getMovieById();
  }, [movieID]);

  useEffect(() => {
    if (!movie) return;
    document.title = `Movie - ${movie.Title}`;

    return () => {
      document.title = 'usePopcorn - search movies by title';
    };
  }, [movie]);

  useListenKey('Escape', onClose);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && !error && movie && (
        <>
          <Button className="back-btn" onClick={onClose}>
            &larr;
          </Button>
          <MovieLg movie={movie}>
            <div className="rating">
              {!isListed ? (
                <>
                  <StarRating
                    maxRating={maxRating}
                    defaultRating={userRating}
                    size={starSize}
                    onSetRating={handleOnSetRating}
                  />
                  {userRating > 0 && (
                    <Button className="add-btn" onClick={handleAddWatchedMovie}>
                      + Add to watched list
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <p>Your rating is 🌟{userRating}&nbsp;</p>
                  <StarRating
                    maxRating={maxRating}
                    defaultRating={userRating}
                    size={starSize}
                    onSetRating={handleOnSetRating}
                  />
                </>
              )}
            </div>
          </MovieLg>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </>
  );
}
