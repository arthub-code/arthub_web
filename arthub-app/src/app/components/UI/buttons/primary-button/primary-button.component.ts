import { CommonModule } from '@angular/common';
import { Component, OnChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import UIButton from '../../framework/UIButton';

@Component({
  selector: 'ui-primary-button',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule],
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent extends UIButton implements OnChanges {
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
