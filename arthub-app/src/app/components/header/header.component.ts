import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarMenuContentComponent } from './sidebar-menu-content/sidebar-menu-content.component';
import { PrimaryButtonComponent } from "../UI/buttons/primary-button/primary-button.component";
import { IndiqueEGanheModalComponent } from "./modals/indique-e-ganhe-modal/indique-e-ganhe-modal.component";
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation/translation.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    SidebarModule,
    SidebarMenuContentComponent,
    PrimaryButtonComponent,
    IndiqueEGanheModalComponent,
    TranslateModule
],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  sidebarMenuVisible: boolean = false;
  sidebarPosition: string = 'right';
  private isBrowser: boolean;

  constructor(private translate: TranslationService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.translate.initTranslate();
  }

  toggleSidebar(position: string) {
    this.sidebarPosition = position;
    this.sidebarMenuVisible = !this.sidebarMenuVisible;
  }
}
