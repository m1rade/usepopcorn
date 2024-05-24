import { MovieListType } from '../movieData';
import { Button } from './Button';
import { MovieListPropsType } from './MovieList';

export function MovieSm({ movies: movie, onSelect, onDelete }: MovieListPropsType) {
  if (!movie) return;

  const { imdbID, Poster, Title, Year } = movie as MovieListType;
  let markup;

  if ('userRating' in movie) {
    const { imdbRating, userRating, runtime } = movie;

    markup = (
      <>
        <p>
          <span>⭐️</span>
          <span>{imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{runtime}</span>
        </p>

        <Button className="delete-btn" onClick={() => onDelete && onDelete(imdbID)}>
          X
        </Button>
      </>
    );
  } else if (!Array.isArray(movie)) {
    markup = (
      <p>
        <span>📅</span>
        <span>{Year}</span>
      </p>
    );
  }

  return (
    <li
      onClick={() => {
        onSelect && onSelect(imdbID);
      }}>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div className="movie-info">{markup}</div>
    </li>
  );
}
