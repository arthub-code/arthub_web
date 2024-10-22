import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { PrimaryCardComponent } from "../../components/UI/cards/primary-card/primary-card.component";
import { PrimaryInputComponent } from "../../components/UI/inputs/primary-input/primary-input.component";
import { CommonModule } from '@angular/common';
import LoginPayload from '../../model/LoginPayload';
import { FormsModule } from '@angular/forms';
import { SecondaryInputComponent } from "../../components/UI/inputs/secondary-input/secondary-input.component";
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, PrimaryCardComponent, PrimaryInputComponent, SecondaryInputComponent],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent implements OnInit{
  accountLoginPerson: LoginPayload = new LoginPayload();
  text: string = '';

  constructor(private translate: TranslationService) {
    this.accountLoginPerson.email = "";
  }

  async ngOnInit() {
      this.text = await this.translate.ml('messages.error.validation_fieldIsRequired');
  }

  handleInputChange(value: string) {
    console.log("Valor ai: " + this.accountLoginPerson.email);
  }
}
