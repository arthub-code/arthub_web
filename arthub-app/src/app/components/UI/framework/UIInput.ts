import { Directive, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import UIComponent from "../UIComponent";
import { TranslationService } from "../../../services/translation/translation.service";

@Directive()
export default class UIInput extends UIComponent implements ControlValueAccessor {
  @Input() value: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text'; // Default to text input
  @Input() required: boolean = false;
  @Input() useLabel: boolean = false;
  @Input() minLength: number | null = null;
  @Input() maxLength: number | null = null;
  @Input() errorMessage: string = '';

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  isInvalid: boolean = false;

  constructor(private translate: TranslationService) { super(); }

  onChange = (value: any) => {};
  onTouched = () => {};

  async onInputChange(event: any){
    const newValue = event.target.value;
    this.value = newValue;
    this.onChange(newValue);
    await this.validateInput();
    this.valueChange.emit(this.value);
  }

  async validateInput() {
    this.isInvalid = false;
    this.errorMessage = '';

    if (this.required && !this.value) {
      this.isInvalid = true;
      this.errorMessage = await this.translate.ml('messages.error.validation_fieldIsRequired');
    } else if (this.minLength && this.value.length < this.minLength) {
      this.isInvalid = true;
      this.errorMessage = await this.translate.mlFormat('messages.error.validation_minLength', this.minLength);
    } else if (this.maxLength && this.value.length > this.maxLength) {
      this.isInvalid = true;
      this.errorMessage = await this.translate.mlFormat('messages.error.validation_maxLength', this.minLength);
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }
}
