import { ContentChild, Directive, EventEmitter, HostListener, Input, Output, TemplateRef } from "@angular/core";
import OptionsSelect from "../../../model/OptionsSelect";
import UIComponent from "../UIComponent";

@Directive()
export default class UISelect extends UIComponent{
    @Input() labelText?: string;
    @Input() useObrigatory: boolean = true;
    @Input() options: OptionsSelect[] = [
        new OptionsSelect("valor1", "texto1"),
    ]
    @Input() placeholder?: string;
}