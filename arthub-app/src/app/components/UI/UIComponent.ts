import { Directive, HostBinding, Input, OnChanges } from "@angular/core";

@Directive()
export default class UIComponent implements OnChanges {
  @Input() style: { [key: string]: string } = {};
  @Input() width: string = "";

  @HostBinding('style.width') hostWidth: string = "";

  constructor() {}

  ngOnChanges(): void {
    this.hostWidth = this.width;
  }
}
