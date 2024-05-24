import { useState } from 'react';
import { ErrorMessage } from './components/ErrorMessage';
import { ListContainer } from './components/ListContainer';
import { Loader } from './components/Loader';
import { MovieInfo } from './components/MovieInfo';
import { MovieList } from './components/MovieList';
import { Navbar, NumResults, Search } from './components/Navbar';
import { WatchedSummary } from './components/WatchedSummary';
import { useFetchMovies } from './hooks/useFetchMovies';
import { useLocalStorage } from './hooks/useLocalStorage';
import { WatchedMovieType } from './movieData';

function App() {
  const [watchedMovies, setWatchedMovies] = useLocalStorage<WatchedMovieType[]>([], 'watchedMovies');

  const [selectedID, setSelectedID] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const { movies, isLoading, error } = useFetchMovies(query, handleCloseSelectedMovie);

  const handleSelectMovie = (movieID: string) => setSelectedID(selectedID => (selectedID === movieID ? null : movieID));

  function handleCloseSelectedMovie() {
    setSelectedID(null);
  }

  const handleAddWatchedMovie = (movie: WatchedMovieType) => setWatchedMovies(watched => [...watched, movie]);

  const handleDeleteWatched = (movieID: string) => {
    if (window.confirm('🛑 Remove movie from your watched list?')) {
      setWatchedMovies(watched => watched.filter(w => w.imdbID !== movieID));
    }
  };

  const handleChangeUserRating = (rating: number, movieID: string) =>
    setWatchedMovies(watched => watched.map(w => (w.imdbID === movieID ? { ...w, userRating: rating } : w)));

  return (
    <>
      <Navbar>
        <Search onSearch={setQuery} />
        <NumResults num={movies.length} />
      </Navbar>
      <MainContent>
        <ListContainer>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelect={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </ListContainer>
        <ListContainer>
          {selectedID ? (
            <MovieInfo
              movieID={selectedID}
              watchedMovies={watchedMovies}
              onAddWatchedMovie={handleAddWatchedMovie}
              onChangeUserRating={handleChangeUserRating}
              onClose={handleCloseSelectedMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watchedMovies} />
              <MovieList movies={watchedMovies} onSelect={handleSelectMovie} onDelete={handleDeleteWatched} />
            </>
          )}
        </ListContainer>
      </MainContent>
    </>
  );
}

export default App;

function MainContent({ children }: { children?: React.ReactNode }) {
  return <main className="main">{children}</main>;
}
