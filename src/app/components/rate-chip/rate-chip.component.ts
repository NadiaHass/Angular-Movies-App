import { Component, computed, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-rate-chip',
  imports: [],
  templateUrl: './rate-chip.component.html',
  styleUrl: './rate-chip.component.scss'
})
export class RateChipComponent {
  @Input({required: true}) rate: number = 0;
  @Input() placeDecimals: number = 0;

  formattedRate = computed(() => this.rate.toFixed(this.placeDecimals));
}
