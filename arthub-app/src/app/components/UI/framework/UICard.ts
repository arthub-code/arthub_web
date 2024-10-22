import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";
import UIComponent from "../UIComponent";

@Directive()
export default class UICard extends UIComponent {
  @Input() enableCarousel: boolean = false;
  @Input() paddingVertical: string = "";

  contentOverflowing: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    super();
  }

  ngAfterViewInit(): void {
    this.checkForOverflow();
    this.updatePadding();
  }

  override ngOnChanges(): void {
    super.ngOnChanges();
    this.updatePadding();
  }

  checkForOverflow(): void {
    const element = this.el.nativeElement.querySelector('.primary-card');
    if (element.scrollWidth > element.clientWidth) {
      this.contentOverflowing = true;
    }
  }

  updatePadding(): void {
    const element = this.el.nativeElement.querySelector('.primary-card');
    if (element) {
      this.renderer.setStyle(element, 'paddingTop', this.paddingVertical);
      this.renderer.setStyle(element, 'paddingBottom', this.paddingVertical);
    }
  }
}
