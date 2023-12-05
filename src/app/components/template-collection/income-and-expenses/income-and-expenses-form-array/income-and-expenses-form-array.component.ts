import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, OnInit, ChangeDetectorRef, AfterViewInit, ElementRef } from '@angular/core';
import { OnlyNumberDirective } from '@domo/domo-commons-lib';
import { Dropdown } from 'primeng/dropdown';
import { InputNumber } from 'primeng/inputnumber';
import { every } from 'rxjs';

export interface InExValue {
  name: string,
  quantity: number,
  finishDate?: Date
}

export class DropdownSelection {
  constructor(
        public options: string[], 
        public selectedOption: string,
        public value: number,
        public isShow: boolean,
        public finishDate?: Date) {}
  getInExValue(): InExValue {
    return {name: this.selectedOption, quantity: this.value, finishDate: this.finishDate} as InExValue
  }
}

@Component({
  selector: 'app-income-and-expenses-form-array',
  templateUrl: './income-and-expenses-form-array.component.html',
  styleUrls: ['./income-and-expenses-form-array.component.scss']
})
export class IncomeAndExpensesFormArrayComponent implements OnInit {

  @ViewChildren('IngresDegressInput') IngresDegressInput?: QueryList<ElementRef<HTMLDivElement>>;

  @Input('conceptValues') conceptValues: string[] = [];
  @Input('initValues') initValues: InExValue[] = [];
  @Input('showFinishDate') showFinishDate: boolean = false;
  @Output('onValueChange') onValueChange: EventEmitter<InExValue[]> = new EventEmitter<InExValue[]>();


  /** Selecciones de los dropdowns*/
  dropdownsSelection: DropdownSelection[] = [];
  /** Valores usados */
  usados: Set<string> = new Set<string>();
  /** Flag que determina que hemos pulsado el raton  */
  mouseDown: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.inicializarDropDowns();
  }

  doChange(event: any, index: number) {
    this.usados.add(event.target.value);
  }

  addCombobox2() {
    const dropdownIndex: number = this.dropdownsSelection.findIndex(c => c.isShow === false);
    this.dropdownsSelection[dropdownIndex].isShow = true;
    this.dropdownsSelection[dropdownIndex].value = 0;
    console.log("dropdown index => ", this.dropdownsSelection);

  }

  removeCombobox(dropdown: DropdownSelection): void {
    dropdown.selectedOption = '';
    dropdown.value = 0;
    dropdown.isShow = false;
    this.emitValues();
  }

  isAllShowing(): boolean {
    const showCounts: number = this.dropdownsSelection.filter(c => c.isShow === true).length;
    return showCounts === this.dropdownsSelection.length;
  }

  private inicializarDropDowns(): void {
    this.conceptValues.forEach((cValue, index) => this.dropdownsSelection.push(new DropdownSelection(this.conceptValues, '', 0, index === 0 ? true : false)));
    if(this.initValues && this.initValues.length > 0) {
      this.initValues.forEach((iValue, index) => {
        if(iValue.quantity > 0) {
          this.dropdownsSelection[index].selectedOption = iValue.name;
          this.dropdownsSelection[index].value = iValue.quantity;
          this.dropdownsSelection[index].isShow = true;
        }
      });
    }
    this.emitValues();
  }

  public isUsed(option: string): boolean {
    return this.dropdownsSelection.map(val => val.selectedOption).includes(option);
  }

  updateInput(evt: number, dropdown: DropdownSelection): void {
    dropdown.value = +evt;
    this.emitValues();
  }

  substractValue(dropdown: DropdownSelection):void {
    this.mouseDown = true;
    this.recursiveMinor(dropdown);
  }

  plusValue(dropdown: DropdownSelection): void {
    this.mouseDown = true;
    this.recursivePlus(dropdown);
  }

  public releaseButton(): void {
    this.mouseDown = false;
  }

  private recursivePlus(dropdown: DropdownSelection): void {
    if(this.mouseDown === true) {
      dropdown.value++;
      setTimeout(() => {
        this.recursivePlus(dropdown);
        this.emitValues();
      }, 20)
      
    }
  }

  private recursiveMinor(dropdown: DropdownSelection): void {
    if(this.mouseDown === true && dropdown.value > 0) {
      dropdown.value--;
      setTimeout(() => {
        this.recursiveMinor(dropdown);
        this.emitValues();
      }, 20)
      
    }
  }

  public formatCurerncy(input: HTMLInputElement): void {
    input.value = input.value + ' €';
  }

  private emitValues():void {
    const arrToEmit: InExValue[] = this.dropdownsSelection.map(c => c.getInExValue()).filter(val => val.quantity > 0);
    this.onValueChange.emit(arrToEmit);
  }

  public showAddButton(i: number, evt: HTMLDivElement): boolean {
    let idWithButton: number = 0;
    const algunoFalse: boolean = this.dropdownsSelection.some(c => c.isShow === false);
    this.dropdownsSelection.forEach((c, i) => {
      if(c.isShow === true) {
        idWithButton = i;
      }
    });

    if(+evt.id === idWithButton && algunoFalse) {
      return true;
    }
    return false;
  }



}
