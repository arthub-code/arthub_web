import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import UISelect from '../../framework/UISelect';

@Component({
  selector: 'ui-primary-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './primary-select.component.html',
  styleUrl: './primary-select.component.scss'
})
export class PrimarySelectComponent extends UISelect{

}
