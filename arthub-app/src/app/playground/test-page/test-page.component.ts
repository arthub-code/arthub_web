import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { PrimaryCardComponent } from "../../components/UI/cards/primary-card/primary-card.component";

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, PrimaryCardComponent],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent {

}
