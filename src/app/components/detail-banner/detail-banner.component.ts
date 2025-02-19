import { Component, Input } from '@angular/core';
import { DetailBannerConfig } from '../../interfaces/ui-configs/detail-banner-config.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-banner',
  imports: [],
  templateUrl: './detail-banner.component.html',
  styleUrl: './detail-banner.component.scss'
})
export class DetailBannerComponent {
  @Input() config!: DetailBannerConfig

  constructor (private router: Router){}

  open(path: string){
    this.router.navigateByUrl(path)
  }
}
