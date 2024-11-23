import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tabPanel]'
})
export class TabPanelDirective {
  @Input('tabPanel') tabContent!: TemplateRef<any>;

  constructor(public template: TemplateRef<any>) {}
}
