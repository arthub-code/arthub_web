import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarMenuContentComponent } from './sidebar-menu-content/sidebar-menu-content.component';
import { PrimaryButtonComponent } from "../UI/buttons/primary-button/primary-button.component";
import { IndiqueEGanheModalComponent } from "./modals/indique-e-ganhe-modal/indique-e-ganhe-modal.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    SidebarModule,
    SidebarMenuContentComponent,
    PrimaryButtonComponent,
    IndiqueEGanheModalComponent
],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  sidebarMenuVisible: boolean = false;
  sidebarPosition: string = 'right';

  toggleSidebar(position: string) {
    this.sidebarPosition = position;
    this.sidebarMenuVisible = !this.sidebarMenuVisible;
  }

}
