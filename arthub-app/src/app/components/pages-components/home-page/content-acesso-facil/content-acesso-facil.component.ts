import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-acesso-facil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-acesso-facil.component.html',
  styleUrl: './content-acesso-facil.component.scss'
})
export class ContentAcessoFacilComponent {
  cards = [
    { link: 'https://example.com/page1', img: '../../../assets/image1.png', text: 'Comissões' },
    { link: 'https://example.com/page2', img: '../../../assets/image1.png', text: 'Artes' },
    { link: 'https://example.com/page3', img: '../../../assets/image1.png', text: 'Perfil' },
    { link: 'https://example.com/page3', img: '../../../assets/image1.png', text: 'Cursos' },
    { link: 'https://example.com/page3', img: '../../../assets/image1.png', text: 'Suporte' },
    { link: 'https://example.com/page3', img: '../../../assets/image1.png', text: 'Comunidade' }
  ];
}
