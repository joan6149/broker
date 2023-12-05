import { SelectListItem } from "@domo/domo-commons-lib/lib/models/SelectList.model";
import { InExValue } from "src/app/components/template-collection/income-and-expenses/income-and-expenses-form-array/income-and-expenses-form-array.component";

export abstract class Request {
    constructor(
        protected load: boolean = false,
        protected published: boolean = false,
        public petitionType: PetitionType = PetitionType.INDIVIDUAL,
        public solicitante: Solicitante = {} as Solicitante,
        public acompaniante: Solicitante = {} as Solicitante
    ) {}

    public setPublished(isPublished: boolean) {
        this.published = isPublished;
    }
}

export class NewMortage extends Request {
    //viviendaHabitual: boolean;
    hipoteca: Hipoteca;

    constructor() {
        super();
        this.hipoteca = this.createNewHipoteca();
    }

    private createNewHipoteca(): Hipoteca {
        return {
            vivienda: {
                tipoVivienda: TipoVivienda.OBRA_NUEVA,
                m2: 100
            }
        } as Hipoteca
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
    ingresos: InExValue[],
    totalIngresos: number,
    gastos: InExValue[],
    totalGastos: number,
    ultimaDeclaracionEnEspania: boolean
    tengoAval: boolean;
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
    valorEntrada: number,
    costesImpuestos: number,
    valorTotalEntradaAportar: number,
    porcentageHipotecar: number,
    importeHipoteca: number,
    anos: number,
    vivienda: Vivienda,
    solicitudPrevia: SolicitudPrevia
}

export interface SolicitudPrevia {
    bancos: string[],
    brokers: string[]
}

export interface DireccionBase {
    ca: string,
    city: string,
    province: string,
}

export interface Direccion extends DireccionBase {
    calle: string,
    numero?: string
    piso: string,
    puerta: string,
    codPostal: string,
}

export interface Vivienda {
    viviendaHabitual: boolean,
    tipoVivienda: string,
    tipoConstruccion: string,
    estadoActual: string,
    m2: number,
    valorVivienda: number,
    situacionVivienda?: DireccionBase
}

export const EstadosActuales = new Map<number, string>([
    [0, 'TENGO NOTA SIMPLE'],
    [1, 'TENGO RESERVA'],
    [2, 'TENGO LAS ARRAS'],
    [3, 'TENGO LA TASACIÓN'],
    [4, 'NO TENGO VIVIENDA IDENTIFICADA']
]);

export const TiposDeConstruccion = new Map<number, string>([
    [0, 'PISO DE UNA PLANTA'],
    [1, 'PISO DUPLEX'],
    [2, 'CHALET ADOSADO'],
    [3, 'CHALET INDEPENDIENTE']
])

export enum TipoVivienda {
    OBRA_NUEVA = 'OBRA NUEVA',
    EXISTENTE = 'EXISTENTE'
}

export enum TipoInteres {
    FIJO = 'FIJO',
    VARIABLE = 'VARIABLE'
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