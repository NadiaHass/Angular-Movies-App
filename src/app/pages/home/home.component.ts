import { Component, OnInit, signal } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieCardConfig } from '../../interfaces/ui-configs/movie-card-config.interface';
import { GenericHttpService } from '../../services/generic-http.service';
import { Endpoints } from '../../endpoints/EndPoints';
import { TrendData, TrendsResult } from '../../interfaces/models/trends.interface';
import { SegmentedControlConfig } from '../../interfaces/ui-configs/segmented-control-config.interface';
import { SegmentedControlComponent } from '../../components/segmented-control/segmented-control.component';
import { Router } from '@angular/router';
import { MovieData, MovieResult } from '../../interfaces/models/movies.interface';
import { TvShowData, TvShowResult } from '../../interfaces/models/tvshows.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputComponent, MovieCardComponent, SegmentedControlComponent],
  providers: [GenericHttpService, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  title = signal('All')
  movies : MovieCardConfig[] = []
  segmentedControlConfig: SegmentedControlConfig[] = [
    {
      name: 'All',
      active: true,
      onclick: () => this.setCategory('All')
    },
    {
      name: 'Movies',
      active: false,
      onclick: () => this.setCategory('Movies') 
    },
    {
      name: 'Tv Shows',
      active: false,
      onclick: () => this.setCategory('Tv Shows')
    }
  ]

  constructor(private genericHttpService: GenericHttpService ,
    private router: Router){}

  ngOnInit(): void {
    this.setCategory('All');
  }

  private fetchAllTrending(){
    this.genericHttpService.httpGet(Endpoints.TRENDS).subscribe({
      next: (response : TrendData) => {
        console.log(response);
        this.movies = response.results.map((item : TrendsResult) => {
          return {
            image : Endpoints.IMAGE_BASE + `/w500/${item.backdrop_path}`,
            name: item.title ?? item.name,
            rate : item.vote_average,
            onclick: () => this.navigateToDetail(item)
          } as MovieCardConfig
        })
      },
      error: (err : any) => {
        console.error('Error fetching movies:', err);
      }
    });
  }

  private fetchAllMovies(){
    this.genericHttpService.httpGet(Endpoints.MOVIES).subscribe({
      next: (response : MovieData) => {
        console.log(response);
        this.movies = response.results.map((item : MovieResult) => {
          return {
            image : Endpoints.IMAGE_BASE + `/w500/${item.backdrop_path}`,
            name: item.title ?? item.name,
            rate : item.vote_average,
            onclick: () => this.router.navigateByUrl(`movie/${item.id}`)
          } as MovieCardConfig
        })
      },
      error: (err : any) => {
        console.error('Error fetching movies:', err);
      }
    });
  }

  private fetchAllTvShows(){
    this.genericHttpService.httpGet(Endpoints.TV_SHOWS).subscribe({
      next: (response : TvShowData) => {
        console.log(response);
        this.movies = response.results.map((item : TvShowResult) => {
          return {
            image : Endpoints.IMAGE_BASE + `/w500/${item.backdrop_path}`,
            name: item.name ?? item.name,
            rate : item.vote_average,
            onclick: () => this.router.navigateByUrl(`tvshow/${item.id}`)
          } as MovieCardConfig
        })
      },
      error: (err : any) => {
        console.error('Error fetching movies:', err);
      }
    });

  }

  private navigateToDetail(item: TrendsResult): void {
    const route = item.media_type === 'movie' ? `movie/${item.id}` : `tvshow/${item.id}`;
    this.router.navigateByUrl(route);
  }

  private setCategory(category: string): void {
    this.title.set(category);

    this.segmentedControlConfig.forEach((config) => {
      config.active = config.name === category;
    });

    switch (category) {
      case 'Movies':
        this.fetchAllMovies();
        break;
      case 'Tv Shows':
        this.fetchAllTvShows();
        break;
      default:
        this.fetchAllTrending();
        break;
    }
  }
}
