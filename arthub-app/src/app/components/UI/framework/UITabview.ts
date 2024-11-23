import { ComponentFactoryResolver, Directive, Input, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import UIComponent from '../UIComponent';

export interface TabPanel {
  mlId: string;
  tabId: string;
  title: string;
  icon?: string;
  content?: TemplateRef<any> | string;
  component?: Type<any>;
  inputs?: any;
}

@Directive()
export class UITabview extends UIComponent {
  @Input() tabs: TabPanel[] = [];
  @Input() useIcons: boolean = false;

  @ViewChild('dynamicContent', { read: ViewContainerRef }) dynamicContent!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) { super(); }

  ngAfterViewInit() {
    this.loadTabs();
  }

  loadTabs() {
    this.tabs.forEach(tab => {
      if (tab.component) {
        const factory = this.resolver.resolveComponentFactory(tab.component);
        const componentRef = this.dynamicContent.createComponent(factory);

        // Verifica se 'inputs' existe no 'tab' e atribui aos inputs do componente
        if (tab.inputs) {
          for (const [inputName, inputValue] of Object.entries(tab.inputs)) {
            if (componentRef.instance.hasOwnProperty(inputName)) {
              componentRef.instance[inputName] = inputValue;
            }
          }
        }
      }
    });
  }
}
