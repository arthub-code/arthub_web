import { Component, Input } from '@angular/core';
import UIButton from '../../framework/UIButton';

@Component({
  selector: 'ui-third-button',
  standalone: true,
  imports: [],
  templateUrl: './third-button.component.html',
  styleUrl: './third-button.component.scss'
})
export class ThirdButtonComponent extends UIButton {
  classButton: string = 'button-active';
  classButtonStatus: boolean = false;
  @Input() eventOnClick!: () => void;
  @Input() labelText: string = "labelText=''";

  switchButton(){
    if(!this.classButtonStatus){
      this.classButton = 'button-desactive';
      this.classButtonStatus = true;
    }
    else{
      this.classButton = 'button-active';
      this.classButtonStatus = false;
    }
    this.eventOnClick();
  }
}
