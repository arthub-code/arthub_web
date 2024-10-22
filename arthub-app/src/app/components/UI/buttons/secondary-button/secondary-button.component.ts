import { Component, OnChanges } from '@angular/core';
import UIButton from '../../framework/UIButton';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-secondary-button',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    ButtonModule,
    DialogModule
  ],
  templateUrl: './secondary-button.component.html',
  styleUrl: './secondary-button.component.scss'
})
export class SecondaryButtonComponent extends UIButton implements OnChanges {
  constructor() {
    super();
  }

  override ngOnChanges(): void {
      super.ngOnChanges();
  }

  override handleClick(): void {
      super.handleClick();
  }
}
