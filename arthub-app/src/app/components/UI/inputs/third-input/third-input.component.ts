import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import UIInput from '../../framework/UIInput';

@Component({
  selector: 'ui-third-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './third-input.component.html',
  styleUrl: './third-input.component.scss'
})
export class ThirdInputComponent extends UIInput{

}
