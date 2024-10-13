import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'arthub-app';
  showHeaderFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      if (this.router.url === '/login' || this.router.url === '/registro' || this.router.url === '/email') {
        this.showHeaderFooter = false;
      } else {
        this.showHeaderFooter = true;
      }
    });
  }
}
