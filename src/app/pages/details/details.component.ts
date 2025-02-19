import { Component, OnInit } from '@angular/core';
import { DetailBannerComponent } from '../../components/detail-banner/detail-banner.component';
import { DetailBannerConfig } from '../../interfaces/ui-configs/detail-banner-config.interface';
import { Endpoints } from '../../endpoints/EndPoints';
import { ActivatedRoute } from '@angular/router';
import { GenericHttpService } from '../../services/generic-http.service';

@Component({
  selector: 'app-details',
  imports: [DetailBannerComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  constructor(private activatedRoute: ActivatedRoute,
    private genericHttpService: GenericHttpService
  ){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: any) => {
      console.log("Params : ", paramMap);
      if(paramMap.params.movie_id){

      }else if(paramMap.params.tvshow_id){

      }
    })
  }

  getMovieById(id: string){
    
  }

  getTvShowById(id: string){

  }

  config: DetailBannerConfig = {
    pageName: "Tv Shows",
    path: "tvshows",
    title: "The Weekend",
    image: `${Endpoints.IMAGE_BASE}/w500//9nhjGaFLKtddDPtPaX5EmKqsWdH.jpg`}
}
