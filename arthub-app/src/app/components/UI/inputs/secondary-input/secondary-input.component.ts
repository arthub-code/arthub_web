import { Component, forwardRef } from '@angular/core';
import UIInput from '../../framework/UIInput';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../../services/translation/translation.service';

@Component({
  selector: 'ui-secondary-input',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './secondary-input.component.html',
  styleUrl: './secondary-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SecondaryInputComponent),
      multi: true
    }
  ]
})
export class SecondaryInputComponent extends UIInput {
  constructor(private translante: TranslationService) {
    super(translante);
  }
}
