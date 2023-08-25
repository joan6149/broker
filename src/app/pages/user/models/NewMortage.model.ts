import { SelectListItem } from "@domo/domo-commons-lib/lib/models/SelectList.model";

export class NewMortage {
    petitionType: PetitionType;
    solicitante: Solicitante;
    acompaniante: Solicitante;
    viviendaHabitual: boolean;
    hipoteca: Hipoteca;
    periodoNuevaPeticion: number; //Años a los que quieres poner la hipoteca
    ubicacionVivienda: Direccion;
    m2: number;
    tipoConstruccion: string;

    constructor() {
        this.petitionType = PetitionType.INDIVIDUAL;
        this.solicitante = {} as Solicitante;
        this.acompaniante = {} as Solicitante;
        this.viviendaHabitual = true;
        this.hipoteca = this.createNewHipoteca();
        this.periodoNuevaPeticion = 0;
        this.ubicacionVivienda = {} as Direccion;
        this.m2 = 0;
        this.tipoConstruccion = tiposDeConstruccion.get(0)!;
    }

    private createNewHipoteca(): Hipoteca {
        return {
            vivienda: {
                tipoVivienda: TipoVivienda.OBRA_NUEVA
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
    ingresos: Ingreso[],
    gastos: Gasto[],
    ultimaDeclaracionEnEspania: boolean
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
    anos: number,
    vivienda: Vivienda,
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

export interface Vivienda {
    tipoVivienda: string,
    estadoActual: string,
    situacionVivienda?: Direccion
}

export const estadosActuales = new Map<number, string>([
    [0, 'TENGO NOTA SIMPLE'],
    [1, 'TENGO RESERVA'],
    [2, 'TENGO LAS ARRAS'],
    [3, 'TENGO LA TASACIÓN'],
    [4, 'NO TENGO VIVIENDA IDENTIFICADA']
]);

export const tiposDeConstruccion = new Map<number, string>([
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