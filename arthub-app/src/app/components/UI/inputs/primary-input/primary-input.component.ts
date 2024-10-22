import { Component, forwardRef } from '@angular/core';
import UIInput from '../../framework/UIInput';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslationService } from '../../../../services/translation/translation.service';

@Component({
  selector: 'ui-primary-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimaryInputComponent),
      multi: true
    }
  ]
})
export class PrimaryInputComponent extends UIInput {
  constructor(private translante: TranslationService) {
    super(translante);
  }
}
