import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DetailBannerComponent } from '../../components/detail-banner/detail-banner.component';
import { RateChipComponent } from '../../components/rate-chip/rate-chip.component';
import { GenericHttpService } from '../../services/generic-http.service';
import { DetailBannerConfig } from '../../interfaces/ui-configs/detail-banner-config.interface';
import { DetailConfig } from '../../interfaces/ui-configs/detail-config.interface';
import { Endpoints } from '../../endpoints/EndPoints';
import { Genre, MovieDetails } from '../../interfaces/models/movie-details.interface';
import { TvShowDetails } from '../../interfaces/models/tv-show-details.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [DetailBannerComponent, RateChipComponent, CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  bannerConfig!: DetailBannerConfig;
  config!: DetailConfig;

  constructor(
    private activatedRoute: ActivatedRoute,
    private genericHttpService: GenericHttpService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((paramMap: ParamMap) => {
          const movieId = paramMap.get('movie_id');
          const serieId = paramMap.get('serie_id');

          if (movieId) {
            return this.genericHttpService.httpGet<MovieDetails>(Endpoints.MOVIE_ID(movieId));
          } else if (serieId) {
            return this.genericHttpService.httpGet<TvShowDetails>(Endpoints.TV_SHOW_ID(serieId));
          }
          return [];
        })
      )
      .subscribe({
        next: (response) => this.handleResponse(response),
        error: (error) => console.error(error)
      });
  }

  private handleResponse(response: MovieDetails | TvShowDetails): void {
    if ('original_title' in response) {
      this.setupMovieDetails(response);
    } else {
      this.setupTvShowDetails(response);
    }
  }

  private setupMovieDetails(response: MovieDetails): void {
    this.bannerConfig = {
      pageName: 'Movies',
      path: 'movies',
      title: response.original_title,
      image: `${Endpoints.IMAGE_BASE}/w1280${response.backdrop_path}`
    };

    this.config = {
      img: `${Endpoints.IMAGE_BASE}/w500${response.poster_path}`,
      subtitle: response.tagline,
      description: response.overview,
      rate: response.vote_average,
      isVertical: true,
      detailCards: [
        { title: 'Type', description: 'Movie' },
        { title: 'Release date', description: response.release_date },
        { title: 'Run time', description: `${response.runtime} min` },
        { title: 'Genres', description: this.formatGenres(response.genres) }
      ]
    };
  }

  private setupTvShowDetails(response: TvShowDetails): void {
    this.bannerConfig = {
      pageName: 'Tv Shows',
      path: 'tvshows',
      title: response.original_name,
      image: `${Endpoints.IMAGE_BASE}/w1280${response.backdrop_path}`
    };

    this.config = {
      img: `${Endpoints.IMAGE_BASE}/w1280${response.poster_path}`,
      subtitle: response.tagline,
      description: response.overview,
      rate: response.vote_average,
      isVertical: false,
      detailCards: [
        { title: 'Type', description: 'TV Show' },
        { title: 'Status', description: response.status },
        { title: 'First air date', description: response.first_air_date },
        { title: 'Last air date', description: response.last_air_date },
        { title: 'No. of seasons', description: response.number_of_seasons.toString() },
        { title: 'No. of episodes', description: response.number_of_episodes.toString() },
        { title: 'Episode run time', description: `${response.episode_run_time?.join(', ') || 'N/A'} min` },
        { title: 'Genres', description: this.formatGenres(response.genres) }
      ]
    };
  }

  private formatGenres(genres: Genre[]): string {
    return genres.map((genre) => genre.name).join(', ');
  }
}
