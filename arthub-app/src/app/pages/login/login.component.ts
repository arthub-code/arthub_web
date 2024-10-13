import { Component, Inject, PLATFORM_ID, ɵunwrapSafeValue } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/atuhentication/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  accountLoginPerson: LoginPayload = new LoginPayload();
  isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); 
  }

  public PostLoginAccount() {
    if (this.isBrowser) {
      this.authService.login(this.accountLoginPerson).subscribe(
        (response: any) => {
          if (response && response.data.token) {
            this.authService.saveToken(response.data.token);
            this.router.navigate(['']); 
          } else {
            alert("salve");
          }
        },
        error => {
          alert("Erro ao fazer login: " + error.message);
        }
      );
    }
  }
}

class LoginPayload {
  email!: string;
  password!: string;
}
