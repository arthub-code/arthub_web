import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentArtesAndamentoComponent } from '../../components/pages-components/home-page/content-artes-andamento/content-artes-andamento.component';
import { ContentAcessoFacilComponent } from '../../components/pages-components/home-page/content-acesso-facil/content-acesso-facil.component';
import { ContentPerfilHomeComponent } from '../../components/pages-components/home-page/content-perfil-home/content-perfil-home.component';

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
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
