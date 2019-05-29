import { Component, OnInit, ContentChild, AfterContentInit, Input } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, AfterContentInit {
  

  @Input() input: any
  @Input() label: string
  @Input() errorMessage: string
  @Input() showTip: boolean = true

  @ContentChild(NgModel) model: NgModel
  @ContentChild(FormControlName) control: FormControlName
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.input = this.model || this.control
    if(this.input === undefined) 
      throw new Error("Esse componente precisa ser usado com a diretiva ngModel ou formControlName.");
  }

}
