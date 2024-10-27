import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimarySelectComponent } from '../../../../../UI/selects/primary-select/primary-select.component';
import { PrimaryButtonComponent } from '../../../../../UI/buttons/primary-button/primary-button.component';
import { ThirdButtonComponent } from '../../../../../UI/buttons/third-button/third-button.component';
import { SecondaryInputComponent } from '../../../../../UI/inputs/secondary-input/secondary-input.component';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ThirdInputComponent } from "../../../../../UI/inputs/third-input/third-input.component";

@Component({
  selector: 'content-artes-andamento-modal-registrar-arte',
  standalone: true,
  imports: [PrimarySelectComponent, PrimaryButtonComponent, ThirdButtonComponent, SecondaryInputComponent, CalendarModule, FormsModule, FloatLabelModule, ThirdButtonComponent, ThirdInputComponent],
  templateUrl: './modal-registrar-arte.component.html',
  styleUrl: './modal-registrar-arte.component.scss'
})
export class ModalRegistrarArteComponent {
  dateRange!: Date[];
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
