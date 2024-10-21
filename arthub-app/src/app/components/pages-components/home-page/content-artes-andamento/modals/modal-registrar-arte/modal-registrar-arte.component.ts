import { Component } from '@angular/core';

@Component({
  selector: 'content-artes-andamento-modal-registrar-arte',
  standalone: true,
  imports: [],
  templateUrl: './modal-registrar-arte.component.html',
  styleUrl: './modal-registrar-arte.component.scss'
})
export class ModalRegistrarArteComponent {
  classButton: string = 'button-active';
  classButtonStatus: boolean = false;

  switchButton(){
    if(!this.classButtonStatus){
      this.classButton = 'button-desactive';
      this.classButtonStatus = true;
    }
    else{
      this.classButton = 'button-active';
      this.classButtonStatus = false;
    }
  }
}
