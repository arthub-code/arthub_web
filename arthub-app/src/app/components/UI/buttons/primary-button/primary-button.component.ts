import { Component } from '@angular/core';
import UIButton from '../../framework/UIButton';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'ui-primary-button',
  standalone: true,
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
  imports: [UIButton, CommonModule]
})
export class PrimaryButtonComponent extends UIButton {
  primaryClass: string = 'primary-button';
}

