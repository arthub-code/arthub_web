import { Component } from '@angular/core';
import { SecondaryButtonComponent } from "../../../UI/buttons/secondary-button/secondary-button.component";
import { ModalRegistrarArteComponent } from "./modals/modal-registrar-arte/modal-registrar-arte.component";

@Component({
  selector: 'app-content-artes-andamento',
  standalone: true,
  imports: [SecondaryButtonComponent, ModalRegistrarArteComponent],
  templateUrl: './content-artes-andamento.component.html',
  styleUrl: './content-artes-andamento.component.scss'
})
export class ContentArtesAndamentoComponent {

}
