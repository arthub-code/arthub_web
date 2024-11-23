import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SecondaryButtonComponent } from "../../../UI/buttons/secondary-button/secondary-button.component";
import { ModalRegistrarArteComponent } from "./modals/modal-registrar-arte/modal-registrar-arte.component";
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../../services/translation/translation.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-content-artes-andamento',
  standalone: true,
  imports: [
    SecondaryButtonComponent,
    ModalRegistrarArteComponent,
    TranslateModule
  ],
  templateUrl: './content-artes-andamento.component.html',
  styleUrls: ['./content-artes-andamento.component.scss']
})
export class ContentArtesAndamentoComponent {
  private isBrowser: boolean;

  constructor(private translate: TranslationService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.translate.initTranslate();
  }
}
