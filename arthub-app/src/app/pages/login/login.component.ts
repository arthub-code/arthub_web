import { Component, Inject, OnInit, PLATFORM_ID, ɵunwrapSafeValue } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/atuhentication/auth.services';
import { PrimaryButtonComponent } from '../../components/UI/buttons/primary-button/primary-button.component';
import LoginPayload from '../../model/LoginPayload';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation/translation.service';
import { PrimaryInputComponent } from "../../components/UI/inputs/primary-input/primary-input.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    PrimaryButtonComponent,
    TranslateModule,
    PrimaryInputComponent
],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  accountLoginPerson: LoginPayload = new LoginPayload();
  isBrowser: boolean;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.translate.initTranslate();
  }

  public async PostLoginAccount() {
    this.isLoading = true;
    if (this.isBrowser) {
      this.authService.login(this.accountLoginPerson).subscribe(
        (response: any) => {
          if (response && response.data.token) {
            this.authService.saveToken(response.data.token);
            this.router.navigate(['']);
            this.isLoading = false;
          } else {
            alert("salve"); // Alterar isso depois..... - Vitor
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
