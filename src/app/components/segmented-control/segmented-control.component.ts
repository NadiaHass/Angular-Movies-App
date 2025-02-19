import { Component, Input } from '@angular/core';
import { SegmentedControlConfig } from '../../interfaces/ui-configs/segmented-control-config.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-segmented-control',
  imports: [CommonModule],
  templateUrl: './segmented-control.component.html',
  styleUrl: './segmented-control.component.scss'
})
export class SegmentedControlComponent {
  @Input() config: SegmentedControlConfig[] = []

  selectSegment(clickedSegment : SegmentedControlConfig){
    this.config.map((segment : SegmentedControlConfig) => {
      segment.active = segment.name === clickedSegment.name
    })
  }

}