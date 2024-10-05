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
  styleUrl: './registrar.component.scss'
})
export class RegistrarComponent {
  accountCreatePerson: ResgisterAccount = new ResgisterAccount();
  etapa = 1;
  cliente!: HttpClient;
  classStepTwo: string = "none";
  classStepOne: string = "flex";
  confirmarSenha!: string;
  nome!: string;
  sobrenome!: string;

  constructor(private clientes: HttpClient){
    this.cliente = clientes;
  }

  public PostRegisterAccount(){
    this.accountCreatePerson.fullname = this.nome + ' ' + this.sobrenome
    this.cliente.post('localhost:8080/useraccount/v1/public/requestCreationUserAccount', this.accountCreatePerson).subscribe(
      response => {
        alert("Seu email foi cadastro com sucesso");
      },
      error => {
        alert("Sua senha precisa ter mais caracteres");
      }
    )
  }

  public NextOrBackStage(){
    if(this.classStepOne === "flex"){
      this.classStepTwo = "flex";
      this.classStepOne = "none";
      this.etapa = 2;
    } 
    else{
      this.classStepTwo = "none";
      this.classStepOne = "flex";
      this.etapa = 1;
    }
  }
}

export class ResgisterAccount{
    email!: string;
    socialName!: string;
    username!: string;
    password!: string;
    userAccountType!: string;
    fullname!: string;
    dateOfBirth!: Date;
}
