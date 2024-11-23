import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../services/translation/translation.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'header-sidebar-menu-content',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './sidebar-menu-content.component.html',
  styleUrl: './sidebar-menu-content.component.scss'
})
export class SidebarMenuContentComponent {
  private isBrowser: boolean;

  constructor(private translate: TranslationService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.translate.initTranslate();
  }
}
