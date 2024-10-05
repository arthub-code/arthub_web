import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  accountLoginPerson: LoginPayload = new LoginPayload();
  client!: HttpClient;

  constructor(private http: HttpClient){
    this.client = http;
  }

  public PostLoginAccount(){
    this.client.post('localhost:8080/useraccount/v1/public/login', this.accountLoginPerson).subscribe(
      response => {
        alert("Seu email foi cadastro com sucesso");
      },
      error => {
        alert("Sua senha precisa ter mais caracteres");
      }
    );
  }
}

class LoginPayload{
  email!: string;
  password!: string;
}
