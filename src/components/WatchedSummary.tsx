import { WatchedMovieType } from '../movieData';
import { calAverage } from '../utils/calcAverage';

export function WatchedSummary({ watched }: { watched: WatchedMovieType[] }) {
  const averImdbRating = calAverage(watched.map(w => w.imdbRating)).toFixed(2);
  const averUserRating = calAverage(watched.map(w => w.userRating)).toFixed(2);
  const averRuntime = Math.round(calAverage(watched.map(w => w.runtime)));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div className="movie-info">
        <p>
          <span>🔢</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{averImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{averUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{averRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
