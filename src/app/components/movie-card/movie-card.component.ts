import { Component, Input, Output } from '@angular/core';
import { RateChipComponent } from '../rate-chip/rate-chip.component';
import { MovieCardConfig } from '../../interfaces/ui-configs/movie-card-config.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  imports: [RateChipComponent , CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input({required: true}) movie!: MovieCardConfig;
  
}
