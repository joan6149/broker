

export interface Contact {
    acepto: boolean,
    apellidos: string,
    descripcion: string,
    email: string,
    nombre: string,
    telefono: string,
    tipo: string
}

export interface DialogAction {
    id: string,
    show: boolean,
    state: boolean // indica si es un dialogo de erroro de check
}

export enum DialogID {
    operationConfirm = 'OperationConfirm'
}