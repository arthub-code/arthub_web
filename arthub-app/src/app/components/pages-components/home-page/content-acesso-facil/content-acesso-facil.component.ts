import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../../../services/translation/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerIosComponent } from "../../../UI/spinner/spinner-ios/spinner-ios.component";

@Component({
  selector: 'app-content-acesso-facil',
  standalone: true,
  imports: [CommonModule, TranslateModule, SpinnerIosComponent],
  templateUrl: './content-acesso-facil.component.html',
  styleUrl: './content-acesso-facil.component.scss'
})
export class ContentAcessoFacilComponent {
  cards = [
    { link: 'https://example.com/page1', img: '../../../assets/image1.png', text: 'Commissions', idTranslate: "global.txt_commissions" },
    { link: 'https://example.com/page2', img: '../../../assets/image1.png', text: 'Arts', idTranslate: "global.txt_arts" },
    { link: 'https://example.com/page3', img: '../../../assets/image1.png', text: 'Profile', idTranslate: "global.txt_profile" },
    { link: 'https://example.com/page3', img: '../../../assets/image1.png', text: 'Courses', idTranslate: "global.txt_courses" },
    { link: 'https://example.com/page3', img: '../../../assets/image1.png', text: 'Support', idTranslate: "global.txt_support" },
    { link: 'https://example.com/page3', img: '../../../assets/image1.png', text: 'Community', idTranslate: "global.txt_community" }
  ];
  loading = true;
  private isBrowser: boolean;

  constructor(private translate: TranslationService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.translate.initTranslate();

    Promise.all(
      this.cards.map(async c => {
        c.text = await this.translate.ml(c.idTranslate);
        return c;
      })
    ).then((updatedCards) => {
      this.cards = updatedCards;
      this.loading = false;
    });
  }
}
