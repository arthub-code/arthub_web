import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'] // misterbv: Boas práticas do angular, estilos em array, porque podem ter vários estilos;
})
export class RegistrarComponent {
  accountCreatePerson: RegisterAccount = new RegisterAccount();
  etapa = 1;
  classStepTwo: string = "none";
  classStepOne: string = "flex";
  confirmarSenha!: string;
  nome!: string;
  sobrenome!: string;

  constructor(private cliente: HttpClient) {} // mistervb: Aqui o HttpClient pode ser injetado diretamente

  public PostRegisterAccount() {
    this.accountCreatePerson.fullName = this.nome + ' ' + this.sobrenome;
    this.cliente.post('http://localhost:8080/useraccount/v1/public/requestCreationUserAccount', this.accountCreatePerson)
    .subscribe(
      (response: any) => {
        const successMessage = response ? JSON.stringify(response) : "Seu email foi cadastrado com sucesso";
        alert(successMessage);
      },
      (error: any) => {
        const errorMessage = error["error"] ? JSON.stringify(error) : "Ocorreu um erro durante o cadastro.";
        alert(errorMessage);
      }
    );
  }

  public NextOrBackStage() {
    if (this.classStepOne === "flex") {
      this.classStepTwo = "flex";
      this.classStepOne = "none";
      this.etapa = 2;
    } else {
      this.classStepTwo = "none";
      this.classStepOne = "flex";
      this.etapa = 1;
    }
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
