export class NewMortage {
    petitionType: PetitionType
    constructor() {
        this.petitionType = PetitionType.INDIVIDUAL;
    }
}

export enum PetitionType {
    INDIVIDUAL = 'INDIVIDUAL',
    CONJUNTA = 'CONJUNTA'
}