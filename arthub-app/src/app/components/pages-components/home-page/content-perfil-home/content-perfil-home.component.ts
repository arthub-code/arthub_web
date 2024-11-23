import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { PrimaryButtonComponent } from '../../../UI/buttons/primary-button/primary-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../../services/translation/translation.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-content-perfil-home',
  standalone: true,
  imports: [PrimaryButtonComponent, TranslateModule],
  templateUrl: './content-perfil-home.component.html',
  styleUrl: './content-perfil-home.component.scss'
})
export class ContentPerfilHomeComponent {
  socialName: string = "Rennan";
  private isBrowser: boolean;

  constructor(private translate: TranslationService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.translate.initTranslate();
  }
}
