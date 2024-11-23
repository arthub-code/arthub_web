import { Component } from '@angular/core';
import UIButton from '../../framework/UIButton';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-secondary-button',
  standalone: true,
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.scss'],
  imports: [UIButton, CommonModule]
})
export class SecondaryButtonComponent extends UIButton {
  secondaryClass: string = 'secondary-button';
}
