

export class Evento {
    constructor(
        public nombre: string,
        public infAdicional: string,
        public abierto?: boolean,
        public capacidad?: number,
        public _id?: string,
        public cloud?: string,
        public clouds?: string,
    ) {}
}
