import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import UIVisualizer from '../../framework/UIVisualizer';
import { ArtImageRef } from '../../../../model/ArtModel';

@Component({
  selector: 'ui-primary-visualizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-primary-visualizer.component.html',
  styleUrl: './ui-primary-visualizer.component.scss'
})
export class UiPrimaryVisualizerComponent extends UIVisualizer {
  @Input() images: ArtImageRef[] = [];

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }
}
