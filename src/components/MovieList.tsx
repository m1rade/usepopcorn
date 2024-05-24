import { MovieListType } from '../movieData';
import { MovieSm } from './MovieSm';

export type MovieListPropsType = {
  movies?: MovieListType | MovieListType[];
  onSelect?: (id: string) => void;
  onDelete?: (id: string) => void;
};
export function MovieList({ movies, onSelect, onDelete }: MovieListPropsType) {
  return (
    <ul className="movie-list">
      {movies &&
        Array.isArray(movies) &&
        movies.map(m => <MovieSm key={m.imdbID} movies={m} onSelect={onSelect} onDelete={onDelete} />)}
    </ul>
  );
}
