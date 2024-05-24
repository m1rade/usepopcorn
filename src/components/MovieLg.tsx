import { IMovie } from '../types/common';

export function MovieLg({ movie, children }: { movie: IMovie; children?: React.ReactNode }) {
  return (
    <article className="details">
      <header>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <div className="title-container">
          <h2>{movie.Title}</h2>
          <ul className="show--dividers">
            <li>{movie.Year}</li>
            <li>{movie.Rated}</li>
            <li>{movie.Runtime}</li>
          </ul>
          <p>{movie.Genre}</p>
          <ul>
            <li>⭐&nbsp;IMDB:</li>
            <li>{movie.imdbRating}</li>
          </ul>
          <p>{movie.Country}</p>
        </div>
      </header>
      {children}
      <section>
        <p>
          <span>Director:</span>
          <span>{movie.Director}</span>
        </p>
        <p>
          <span>Writers:</span>
          <span>{movie.Writer}</span>
        </p>
        <p>
          <span>Stars:</span>
          <span>{movie.Actors}</span>
        </p>
        <p>
          <em>{movie.Plot}</em>
        </p>
      </section>
    </article>
  );
}
