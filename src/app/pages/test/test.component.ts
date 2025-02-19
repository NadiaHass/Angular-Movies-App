import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SegmentedControlComponent } from '../../components/segmented-control/segmented-control.component';
import { SegmentedControlConfig } from '../../interfaces/ui-configs/segmented-control-config.interface';
import { InputComponent } from '../../components/input/input.component';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { MovieCardConfig } from '../../interfaces/ui-configs/movie-card-config.interface';

@Component({
  selector: 'app-test',
  imports: [NavBarComponent, SegmentedControlComponent, InputComponent, MovieCardComponent, MovieCardComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  segments: SegmentedControlConfig[] = [
    {
      name: 'All',
      active: true
    },
    {
      name: 'Movies',
      active: false
    },
    {
      name: 'Tv Shows',
      active: false
    }
  ]  

  movie: MovieCardConfig = {
    name: 'Astro Kid',
    rate: 4.5,
    image: 'image'
  }
}
