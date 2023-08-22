import { SelectListItem } from "@domo/domo-commons-lib/lib/models/SelectList.model";

export class NewMortage {
    petitionType: PetitionType;
    solicitante: Solicitante;
    acompaniante: Solicitante;
    viviendaHabitual: boolean;
    hipotecaActual: Hipoteca;
    periodoNuevaPeticion: number; //Años a los que quieres poner la hipoteca
    ubicacionVivienda: Direccion;
    m2: number;
    tipoConstruccion: TipoConstruccion;

    constructor() {
        this.petitionType = PetitionType.INDIVIDUAL;
        this.solicitante = {} as Solicitante;
        this.acompaniante = {} as Solicitante;
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

export enum Source {
    SOLICITANTE = 'SOLICITANTE',
    ACOMPANIANTE = 'ACOMPANIANTE'
}

export interface Solicitante {
    email: string,
    nombre: string,
    apellidos: string,
    movil: string,
    dni: string,
    direccion: Direccion,
    fechaNacimiento: string,
    estadoCivil: string,
    permisoResidencia: string,
    situacionViviendaActual: string,
    hijosAcargo: string,
    situacionLaboral: SituacionLaboral,
    ingresos: Ingreso[],
    gastos: Gasto[]
}

export interface SituacionLaboral {
    typeLaboralSituation: TipoSituacionLaboral,
    profession: string,
    functionaryType?: TipoFuncionario,
    autonomType?: TipoAutonomo,
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
    pais: string,
    ciudad: string,
    provincia: string,
    calle: string,
    piso: string,
    puerta: string,
    codPostal: string
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
    DIVORCIADO = 'DIVORCIADO'
}

export enum TipoSituacionLaboral {
    FUNCIONARIO = 'FUNCIONARIO',
    INDEFINIDO = 'INDEFINIDO',
    AUTONOMO = 'AUTONOMO',
    PENSIONISTA = 'PENSIONISTA'
}

export enum TipoFuncionario {
    INTERINO = 'INTERINO',
    LABORAL = 'LABORAL'
}

export enum TipoAutonomo {
    EMPRESARIO = 'EMPRESARIO',
    AUTONOMO = 'AUTONOMO'
}

export enum TipoSituacionViviendaActual {
    PROPIEDAD = 'PROPIEDAD',
    ALQUILER = 'ALQUILER',
    FAMILIAR = 'FAMILIAR'
}

export enum PermisoResidencia {
    PERMANENTE = 'PERMANENTE',
    TEMPORAL = 'TEMPORAL'
}