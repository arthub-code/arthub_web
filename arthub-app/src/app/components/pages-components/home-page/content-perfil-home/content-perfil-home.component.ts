import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../../UI/buttons/primary-button/primary-button.component';

@Component({
  selector: 'app-content-perfil-home',
  standalone: true,
  imports: [PrimaryButtonComponent],
  templateUrl: './content-perfil-home.component.html',
  styleUrl: './content-perfil-home.component.scss'
})
export class ContentPerfilHomeComponent {
  socialName: string = "Rennan";
}
