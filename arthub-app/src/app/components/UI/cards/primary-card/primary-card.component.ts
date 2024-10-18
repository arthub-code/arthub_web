import { Component, ElementRef, Renderer2 } from '@angular/core';
import UICard from '../../framework/UICard';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'ui-primary-card',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './primary-card.component.html',
  styleUrl: './primary-card.component.scss'
})
export class PrimaryCardComponent extends UICard {
  constructor(el: ElementRef, renderer: Renderer2) {
    super(el, renderer);
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }
}
