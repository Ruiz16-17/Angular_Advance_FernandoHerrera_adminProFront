interface HospitalUser{
    id: string,
    name: string,
    img: string,
}

export class Hospital {
    constructor(
        public name: string,
        public _id?: string,
        public user?: HospitalUser,
        public img?: string
    ) {
        
    }
}