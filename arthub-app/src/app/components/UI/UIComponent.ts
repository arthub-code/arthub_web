import { Directive, HostBinding, Input, OnChanges } from "@angular/core";

@Directive()
export default class UIComponent implements OnChanges {
  @Input() style: { [key: string]: string } = {};
  @Input() id: string = '';
  @Input() width: string = "";

  @HostBinding('style.width') hostWidth: string = "";
  @HostBinding('id') hostId: string = "";

  constructor() {}

  ngOnChanges(): void {
    this.hostWidth = this.width;
    this.hostId = this.id;
  }
}
