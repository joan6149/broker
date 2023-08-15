import { Solicitante } from "src/app/pages/user/models/NewMortage.model";

export interface InitDataInterface {
    solicitantData: Solicitante,
    acompaniantdata?: Solicitante
}

export interface DataFormData {
    solicitantData: any,
    acompaniantData?: any
}