import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import LoginPayload from '../../model/LoginPayload';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation/translation.service';
import { DevianArtService } from '../../services/devianart/devianart.service';
import { MEDIA_SEARCHER, GallerySearchComponent } from '../../components/UI/gallery/gallery-search/gallery-search.component';
import { PrimaryCardComponent } from "../../components/UI/cards/primary-card/primary-card.component";

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [CommonModule, FormsModule, GallerySearchComponent, PrimaryCardComponent],
  providers: [
    { provide: MEDIA_SEARCHER, useClass: DevianArtService }
  ],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent implements OnInit{
  accountLoginPerson: LoginPayload = new LoginPayload();
  text: string = '';

  constructor(private translate: TranslationService, private devianApi: DevianArtService) {
    this.accountLoginPerson.email = "";
  }

  async ngOnInit() {
      this.text = await this.translate.ml('messages.error.validation_fieldIsRequired');
  }

  handleInputChange(value: string) {
    console.log("Valor ai: " + this.accountLoginPerson.email);
  }
}
