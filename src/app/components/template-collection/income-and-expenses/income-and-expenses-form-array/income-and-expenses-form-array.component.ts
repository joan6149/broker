import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, OnInit, ChangeDetectorRef, AfterViewInit, ElementRef } from '@angular/core';
import { Dropdown } from 'primeng/dropdown';
import { InputNumber } from 'primeng/inputnumber';
import { every } from 'rxjs';

export interface InExValue {
  name: string,
  quantity: number
}

export interface DropdownSelection {
  options: string[],
  selectedOption: string
}

@Component({
  selector: 'app-income-and-expenses-form-array',
  templateUrl: './income-and-expenses-form-array.component.html',
  styleUrls: ['./income-and-expenses-form-array.component.scss']
})
export class IncomeAndExpensesFormArrayComponent implements OnInit, AfterViewInit {

  @ViewChildren('IngresDegressInput') IngresDegressInput?: QueryList<ElementRef<HTMLDivElement>>;

  @Output('onValueChange') onValueChange: EventEmitter<InExValue[]> = new EventEmitter<InExValue[]>();

  @Input('conceptValues') conceptValues: string[] = [];
  @Input('initValues') initValues: InExValue[] = [];

  /** Selecciones de los dropdowns*/
  dropdownsSelection: DropdownSelection[] = [];

  /** Valor seleccionado para cada combobox */
  selectedValue: string[] = [];
  /** Valor de los inputs */
  inputvalue: string[] = [];
  /** Lista de valores disponibles para cada combobox */
  selectableValues: Map<number, string[]> = new Map<number, string[]>();
  /** Valores usados */
  usados: Set<string> = new Set<string>();
  /** Este es el map que se devuelve de la lisa de combobox */
  values: InExValue[] = new Array(this.conceptValues.length);
  /** Numero de combobox que se tienen que ver */
  numOfVisibleCombos: number = 1;
  /** Flag para controlar el evento click y change para que no se hagan 2 veces las cosas */
  changeValue: boolean = false;
  //** Este es el valor que acabas de clicar */
  currentValue: string = this.conceptValues[0];
  /** Guarda todos los valores de los combobox excepto el null */
  selectedValuesNotNull: string[] = new Array(this.conceptValues.length);
  //currentValue: Map<number, InExValue> = new Map<number, InExValue>();

  constructor() { }

  ngOnInit(): void {
    // Inicializar array de posibles valores
    this.inicializarDropDowns();
    if(this.initValues && this.initValues.length > 0) {
      this.numOfVisibleCombos = this.initValues.filter(val => val.quantity > 0).length;
      this.initValues.forEach((val, index) => this.dropdownsSelection[index].selectedOption = val.name);
      this.initValues = this.initValues.filter(val => val.quantity > 0);
    } else {
      this.inputvalue[0] = '0 €';
      this.numOfVisibleCombos = 1;
    }

    //this.inputvalue = this.conceptValues.map(val => 0);
    this.selectedValue = this.conceptValues.map(val => '');

    if(this.numOfVisibleCombos === 0) {
      this.numOfVisibleCombos = 1;
    }
    this.conceptValues.forEach((val, index) => this.selectableValues.set(index, this.conceptValues));
    this.values = this.conceptValues.map((val) => {
      return {name: val, quantity: 0} as InExValue
    })
  }

  ngAfterViewInit(): void {
    if(this.initValues) {
      this.initValues.forEach((val, index) => {
        this.dropdownsSelection[index].selectedOption = val.name
        this.inputvalue[index] = `${String(val.quantity)} €`;
        this.values[index] = val;
      
      });
      
      this.emitValues();
    }
  }

  doChange(event: any, index: number) {
    this.usados.add(event.target.value);
    console.log("DROPDOWNS NORMALES => ", this.dropdownsSelection);
    this.values[index] = {name: event.target.value, quantity: this.getInputValue(index)} as InExValue;
    this.emitValues();
  }

  addCombobox() {
    this.numOfVisibleCombos++;
    this.inputvalue[this.numOfVisibleCombos-1] = '0 €';
  }

  removeCombobox(index: number): void {
    console.log("REMOVE COMBO =>", index);
    // Elimino el valor del dropdown
    this.dropdownsSelection[index].selectedOption = '';
    // Elimino el valor del input si lo hubiera
    this.inputvalue[index] = '';
    this.values[index].quantity = 0;
    // Elimino el combobox y el input
    this.IngresDegressInput?.get(index)?.nativeElement.remove();

  }

  private inicializarDropDowns(): void {
    this.conceptValues.forEach((cValue) => this.dropdownsSelection.push({options: this.conceptValues, selectedOption: ''} as DropdownSelection))
    console.log("VALORES INICIALIZADOS => ", this.dropdownsSelection);
  }

  public isUsed(option: string): boolean {
    return this.dropdownsSelection.map(val => val.selectedOption).includes(option);
  }

  updateInput(event: any, i: number): void {
    const value: number = this.getInputValue(i);
    this.values[i] = {name: this.selectedValue[i], quantity: value} as InExValue;
    this.emitValues();
  }

  substractValue(event: any, i: number):void {
    if(+String(+this.inputvalue[i].split(' ')[0]) > 0) {
      this.inputvalue[i] = String(+this.inputvalue[i].split(' ')[0]-1) + ' €';
      this.addValue(i);
    }
  }

  plusValue(event: any, i: number): void {
    this.inputvalue[i] = String(+this.inputvalue[i].split(' ')[0]+1) + ' €';
    this.addValue(i);
  }

  private addValue(index: number): void {
    this.values[index].quantity = this.getInputValue(index);
    this.emitValues();
  }

  private getInputValue(index: number): number {
    return +String(+this.inputvalue[index].split(' ')[0])
  }

  private emitValues():void {
    this.onValueChange.emit(Array.from(this.values.values()));
  }
}
