import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import ApiResponse from '../../types/IApiResponse';
import { TranslationService } from '../../services/translation/translation.service';
import { map } from 'rxjs';
import { PrimaryButtonComponent } from '../../components/UI/buttons/primary-button/primary-button.component';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrimaryButtonComponent
  ],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {
  accountCreatePerson: RegisterAccount = new RegisterAccount();
  etapa = 1;
  classStepTwo: string = "none";
  classStepOne: string = "flex";
  confirmarSenha!: string;
  nome!: string;
  sobrenome!: string;
  displayModal: string = "closedModal"; 

  constructor(private cliente: HttpClient, private translationService: TranslationService) {}

  ngOnInit() {
    this.accountCreatePerson.userAccountType = '';
  }

  public PostRegisterAccount() {
    this.accountCreatePerson.fullName = this.nome + ' ' + this.sobrenome;

    if(this.ValidationPassword(this.accountCreatePerson.password))
      this.cliente.post<ApiResponse>('http://localhost:8080/useraccount/v1/public/requestCreationUserAccount', this.accountCreatePerson)
        .pipe(
          map(async (response: ApiResponse) => {
            if (response && response.data) {
              this.displayModal = "openModal";
              return await this.translationService.translateText(response.data, 'pt');
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
            const errorMessage = await this.translationService.translateText(errerResponse.data) || 'Ocorreu um erro durante o cadastro. Por favor entre em contato com o suporte.';
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
