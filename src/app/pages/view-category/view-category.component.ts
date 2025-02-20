import { Component, OnInit } from '@angular/core';
import { MovieCardConfig } from '../../interfaces/ui-configs/movie-card-config.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericHttpService } from '../../services/generic-http.service';
import { InputComponent } from '../../components/input/input.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { TvShowData, TvShowResult } from '../../interfaces/models/tvshows.interface';
import { Endpoints } from '../../endpoints/EndPoints';
import { MovieData, MovieResult } from '../../interfaces/models/movies.interface';

@Component({
  selector: 'app-view-category',
  standalone: true,
  providers: [GenericHttpService],
  imports: [InputComponent , MovieCardComponent],
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.scss'
})
export class ViewCategoryComponent implements OnInit {
  title: string = '';
  movieCards: MovieCardConfig[] = [];

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private genericService: GenericHttpService ){}
  
  ngOnInit(): void {
    this.activatedRouter.url.subscribe((response) => {
      this.title = response[0].path.includes('movie') ? 'Movies' : 'TV Shows'

      if(this.title === 'Movies'){
        this.getAllMovies();
      }else if(this.title === 'TV Shows'){
        this.getAllTvShows();
      }else{
        this.router.navigateByUrl('');
      }
    });
  }

  getAllMovies() {
    this.genericService.httpGet<MovieData>(Endpoints.MOVIES)
    .subscribe({
      next : (res: MovieData) => {
        this.movieCards = res.results.map((item: MovieResult) => {
          return {
              image: Endpoints.IMAGE_BASE + `/w1280${item.backdrop_path}`,
              name:  item.original_title,
              rate: item.vote_average,
              onClick: () =>{
                  this.router.navigateByUrl(`movie/${item.id}`);
              }
          } as MovieCardConfig
        })

    },
    error: (err: any) => {
      console.error(err)
    }
  }
  )
  }


  getAllTvShows() {
    this.genericService.httpGet<TvShowData>(Endpoints.TV_SHOWS)
    .subscribe({
      next : (res: TvShowData) => {
        this.movieCards = res.results.map((item: TvShowResult) => {
          return {
              image: Endpoints.IMAGE_BASE + `/w1280${item.backdrop_path}`,
              name:  item.original_name,
              rate: item.vote_average,
              onClick: () =>{            
                    this.router.navigateByUrl(`tvshow/${item.id}`)
              }
          } as MovieCardConfig
        })
    },
    error: (err: any) => {
      console.error(err)
    }
  }
  )
  
  }
}