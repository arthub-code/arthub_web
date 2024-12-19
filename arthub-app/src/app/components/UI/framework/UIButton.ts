import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef, ContentChild, HostBinding, AfterViewInit, ViewChild, Renderer2, RendererStyleFlags2 } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SpinnerIosComponent } from '../spinner/spinner-ios/spinner-ios.component';
import UIComponent from '../UIComponent';
import { Dialog } from 'primeng/dialog';

@Component({
  standalone: true,
  selector: 'ui-button',
  templateUrl: "../buttons/ui-button.component.html",
  styleUrls: ['../buttons/ui-button.component.scss'],
  imports: [
    CommonModule,
    ButtonModule,
    SpinnerIosComponent,
    DialogModule
  ]
})
export default class UIButton extends UIComponent implements AfterViewInit {
  @Input() useIcon: boolean = false;
  @Input() titleModal: string = 'Modal Header';
  @Input() useSpinner: boolean = false;
  @Input() iconAlign: 'left' | 'right' = 'left';
  @Input() iconSrc: string = '';
  @Input() textStyle: { [key: string]: string } = {};
  @Input() useModal: boolean = false;
  @Input() useFooter: boolean = false;
  @Input() buttonClass: string = '';
  @Input() modalWidth: string = '';
  @Input() modalHeight: string = '';

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  @HostBinding('class') hostClass: string = '';

  @ContentChild('modalContent', { static: false }) modalContent!: TemplateRef<any>;

  @ViewChild(Dialog) dialog!: Dialog;

  showModal: boolean = false;

  private modalWidthSet: boolean = false;  // Flag para evitar duplicação
  private observer: MutationObserver | null = null;

  constructor(private cdRef: ChangeDetectorRef, private renderer: Renderer2) {
    super();
  }

  ngOnInit(): void {
    if (this.buttonClass) {
      this.hostClass = this.buttonClass + "-hosting"; // Aplica classe dinâmica ao host
    }
  }

  ngAfterViewInit(): void {
    if (this.useModal && this.modalWidth !== '') {
      this.handleModalShown();
    }
  }

  handleClick() {
    if (this.useModal) {
      this.openModal();
    } else {
      this.onClick.emit();
    }
  }

  openModal() {
    setTimeout(() => {
      this.showModal = true;
    }, 150);
  }

  closeModal() {
    setTimeout(() => {
      this.showModal = false;
      this.cdRef.detectChanges();
    }, 200);
  }

  handleModalShown(): void {
    if (this.observer) {
      this.observer.disconnect();
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          if (this.hostClass) {
            const dialogSelector = `.${this.hostClass} .p-dialog`;
            const dialogElement = document.querySelector(dialogSelector) as HTMLElement;

            if (dialogElement) {
              this.renderer.setStyle(dialogElement, 'width', this.modalWidth + 'px');
              if(this.modalHeight != '') {
                this.renderer.setStyle(dialogElement, 'height', this.modalHeight + "px");
              }
              return;
            }
          } else {
            const dialogElement = document.querySelector('.p-dialog') as HTMLElement;
            if (dialogElement) {
              this.renderer.setStyle(dialogElement, 'width', this.modalWidth + 'px');
              if(this.modalHeight != '') {
                this.renderer.setStyle(dialogElement, 'height', this.modalHeight + "px");
              }
              return;
            }
          }
        }
      }
    });

    setTimeout(() => {
      const dialogContainer = document.body;
      if (dialogContainer) {
        observer.observe(dialogContainer, {
          childList: true,
          subtree: true,
        });
      }
    }, 100);

    this.observer = observer;
  }
}
