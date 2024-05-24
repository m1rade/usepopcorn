import { MovieDataType } from '../movieData';

// Server Response types
type ResponseType = 'True' | 'False';
export interface IServerResponse {
  Response: ResponseType;
}
export interface ISucceedResponse extends IServerResponse {
  Search: MovieDataType[];
  totalResults: string;
}
export interface IFailedResponse extends IServerResponse {
  Error: string;
}
/* ------------------------- */

//Movies types
export interface IRatingsEntity {
  Source: string;
  Value: string;
}

export interface IMovie extends IServerResponse {
  Title: string;
  Year: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Genre: string;
  Country: string;
  Poster: string;
  Rated: string;
  Ratings?: IRatingsEntity[] | null;
  Runtime: string;
  imdbRating: string;
  imdbID: string;
  Type: string;
}
