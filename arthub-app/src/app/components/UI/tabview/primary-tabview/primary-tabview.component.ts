import { Component, ComponentFactoryResolver } from '@angular/core';
import { UITabview } from '../../framework/UITabview';
import { TabViewModule } from 'primeng/tabview';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'ui-primary-tabview',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    AvatarModule
  ],
  templateUrl: './primary-tabview.component.html',
  styleUrl: './primary-tabview.component.scss'
})
export class PrimaryTabviewComponent extends UITabview  {
  constructor(private resolverSon: ComponentFactoryResolver) {
    super(resolverSon);
  }

  override ngAfterViewInit(): void {
      super.ngAfterViewInit();
  }
}
