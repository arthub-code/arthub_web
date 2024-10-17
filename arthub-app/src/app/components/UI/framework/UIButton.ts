import { ContentChild, Directive, EventEmitter, HostListener, Input, Output, TemplateRef } from "@angular/core";
import UIComponent from "../UIComponent";

@Directive()
export default class UIButton extends UIComponent {
  @Input() useIcon: boolean = false;
  @Input() iconAlign: 'left' | 'right' = 'left';
  @Input() iconSrc: string = '';
  @Input() textStyle: { [key: string]: string } = {};
  @Input() useModal: boolean = false;

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  @ContentChild('modalContent') modalContent!: TemplateRef<any>;

  showModal: boolean = false;

  constructor() {
    super();
  }

  @HostListener('click')
  handleClick() {
    if (this.useModal) {
      this.openModal();
    } else {
      this.onClick.emit();
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  override ngOnChanges(): void {
    super.ngOnChanges();
  }
}
