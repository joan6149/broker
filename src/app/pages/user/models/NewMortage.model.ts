import { SelectListItem } from "@domo/domo-commons-lib/lib/models/SelectList.model";

export class NewMortage {
    petitionType: PetitionType;
    solicitante: Solicitante;
    viviendaHabitual: boolean;
    hipotecaActual: Hipoteca;
    periodoNuevaPeticion: number; //Años a los que quieres poner la hipoteca
    ubicacionVivienda: Direccion;
    m2: number;
    tipoConstruccion: TipoConstruccion;

    constructor() {
        this.petitionType = PetitionType.INDIVIDUAL;
        this.solicitante = {} as Solicitante;
        this.viviendaHabitual = true;
        this.hipotecaActual = {} as Hipoteca;
        this.periodoNuevaPeticion = 0;
        this.ubicacionVivienda = {} as Direccion;
        this.m2 = 0;
        this.tipoConstruccion = TipoConstruccion.PISO;
    }
}

export enum PetitionType {
    INDIVIDUAL = 'INDIVIDUAL',
    CONJUNTA = 'CONJUNTA'
}

export interface Solicitante {
    estadoCivil: EstadoCivil,
    paisResidente: string,
    hijosAcargo: number,
    situacionLaboral: SituacionLaboral,
    ingresos: Ingreso[],
    gastos: Gasto[]
}

export interface SituacionLaboral {
    tipoSituacion: TipoSituacionLaboral,
    profesion: string,
    fechaInicio: Date 
}

export interface Ingreso {
    tipoIngreso: string,
    cantidad: number
}

export interface Gasto {
    tipogasto: string,
    cantidad: number,
    fechaLiquidacion?: Date,
}

export interface Hipoteca {
    valorPropiedad: number,
    importePendiente?: number,
    tipoInteres: TipoInteres,
    tasaInteres: number,
    anosPendientes: number,
    fechaFirmaHipoteca?: Date,
    situacionVivienda?: Direccion,
    banco: string
}

export interface Direccion {
    comunidad: string,
    provincia: string,
    direccion: string
}

export enum TipoInteres {
    FIJO = 'FIJO',
    VARIABLE = 'VARIABLE'
}

export enum TipoConstruccion {
    PISO,
    DUPLEX,
    CHALETA,
    CHALETI
}


export enum EstadoCivil {
    CASADO = 'CASADO',
    SOLTERO = 'SOLTERO',
    INDEFINNIDO = 'INDEFINNIDO'
}

export enum TipoSituacionLaboral {
    FUNCIONARIO,
    INDEFINNIDO,
    AUTONOMO,
    PENSIONISTA
}