import { Component, Inject, PLATFORM_ID, ɵunwrapSafeValue } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/atuhentication/auth.services';
import { PrimaryButtonComponent } from '../../components/UI/buttons/primary-button/primary-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    PrimaryButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  accountLoginPerson: LoginPayload = new LoginPayload();
  isBrowser: boolean;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); 
  }

  public PostLoginAccount() {
    this.isLoading = true;
    if (this.isBrowser) {
      this.authService.login(this.accountLoginPerson).subscribe(
        (response: any) => {
          if (response && response.data.token) {
            this.authService.saveToken(response.data.token);
            this.router.navigate(['']); 
            this.isLoading = false;
          } else {
            alert("salve");
            this.isLoading = false;
          }
        },
        error => {
          alert("Erro ao fazer login: " + error.message);
          this.isLoading = false;
        }
      );
    }
  }
}

class LoginPayload {
  email!: string;
  password!: string;
}
