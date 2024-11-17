import { Component, Inject, OnInit, PLATFORM_ID, ɵunwrapSafeValue } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimaryButtonComponent } from '../../components/UI/buttons/primary-button/primary-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { PrimarySelectComponent } from '../../components/UI/selects/primary-select/primary-select.component';
import { TranslationService } from '../../services/translation/translation.service';
import { PrimaryInputComponent } from "../../components/UI/inputs/primary-input/primary-input.component";
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import ApiResponse from '../../types/IApiResponse';
import { map } from 'rxjs';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    PrimaryButtonComponent,
    PrimarySelectComponent,
    PrimaryInputComponent,
    TranslateModule
  ],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  accountCreatePerson: RegisterAccount = new RegisterAccount();
  etapa = 1;
  isBrowser: boolean;
  classStepTwo: string = "none";
  classStepOne: string = "flex";
  confirmarSenha!: string;
  nome!: string;
  sobrenome!: string;
  displayModal: string = "closedModal"; 
  optionsSelect: { Value: string, Text: string }[] = [{Value: "Artist", Text: "Artista"},{Value: "Buyer", Text: "Consumidor da arte"}];

  constructor(
    private cliente: HttpClient, 
    private translate: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.accountCreatePerson.userAccountType = '';
    this.translate.initTranslate();
  }

  public PostRegisterAccount() {
    this.accountCreatePerson.fullName = this.nome + ' ' + this.sobrenome;

    if(this.ValidationPassword(this.accountCreatePerson.password))
      this.cliente.post<ApiResponse>('http://localhost:8080/useraccount/v1/public/requestCreationUserAccount', this.accountCreatePerson)
        .pipe(
          map(async (response: ApiResponse) => {
            if (response && response.data) {
              this.displayModal = "openModal";
              return await this.translate.translateText(response.data, 'pt');
            }
            return 'Sua conta foi requisitada com sucesso. Enviamos um email de confirmação, estamos no aguardo de sua resposta.';
          })
        )
        .subscribe(
          async (translatedMessage: Promise<string | undefined>) => {
            const successMessage = await translatedMessage;
            this.displayModal = "openModal"; 
          },
          async (error: any) => {
            let errerResponse: ApiResponse = error?.error;
            const errorMessage = await this.translate.translateText(errerResponse.data) || 'Ocorreu um erro durante o cadastro. Por favor entre em contato com o suporte.';
            alert(errorMessage);
          }
        );
    else
      alert("As senhas não são iguais");
  }

  public ValidationProxStep(){
    if(this.accountCreatePerson.userAccountType != ""
      && this.nome != null
      && this.sobrenome != null
      && this.accountCreatePerson.socialName != null
      && this.accountCreatePerson.dateOfBirth != null
      && this.accountCreatePerson.socialName != ""
      && this.nome != ""
      && this.sobrenome != "")
      return true
    else{
      alert("Preencha todos os campos");
      return false
    }
  }

  public ValidationPassword(password: string): boolean{
    if(password === this.confirmarSenha){
      return true;
    } else{
      return false;
    }
  }

  public NextOrBackStage(){
    if (this.classStepOne === "flex" && this.ValidationProxStep()) {
      this.classStepTwo = "flex";
      this.classStepOne = "none";
      this.etapa = 2;
    } else {
      this.classStepTwo = "none";
      this.classStepOne = "flex";
      this.etapa = 1;
    }
  }

  
  hideModal() {
    this.displayModal = "closedModal";
  }
}

export class RegisterAccount {
  email!: string;
  socialName!: string;
  username!: string;
  password!: string;
  userAccountType!: string;
  fullName!: string;
  dateOfBirth!: Date;
}
