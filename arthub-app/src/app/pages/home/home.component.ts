import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentArtesAndamentoComponent } from '../../components/home-componente/content-artes-andamento/content-artes-andamento.component';
import { ContentAcessoFacilComponent } from '../../components/home-componente/content-acesso-facil/content-acesso-facil.component';
import { ContentPerfilHomeComponent } from '../../components/home-componente/content-perfil-home/content-perfil-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
      CommonModule, 
      ContentAcessoFacilComponent,
      ContentArtesAndamentoComponent,
      ContentPerfilHomeComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
