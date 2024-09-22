import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  socialName: string = "Rennan"; 
  cards = [
    { link: 'https://example.com/page1', img: '../../../assets/image1.png', text: 'Comissões' },
    { link: 'https://example.com/page2', img: '../../../assets/image1.png', text: 'Artes' },
    { link: 'https://example.com/page3', img: '../../../assets/image1.png', text: 'Perfil' },
    { link: 'https://example.com/page3', img: '../../../assets/image1.png', text: 'Cursos' },
    { link: 'https://example.com/page3', img: '../../../assets/image1.png', text: 'Suporte' },
    { link: 'https://example.com/page3', img: '../../../assets/image1.png', text: 'Comunidade' }
  ];
}
