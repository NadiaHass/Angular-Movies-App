export class Endpoints {
    static readonly MOVIES = 'discover/movie';
    static readonly TV_SHOWS = 'discover/tv';
    static readonly TRENDS = 'trending/all/day?language=en-US';
    static readonly IMAGE_BASE: string = 'https://image.tmdb.org/t/p/'

    static MOVIE_ID(movieId: string): string {
      return `movie/${movieId}`;
    }
  
    static TV_SHOW_ID(tvShowId: string): string {
      return `tv/${tvShowId}`;
    }
  }
  