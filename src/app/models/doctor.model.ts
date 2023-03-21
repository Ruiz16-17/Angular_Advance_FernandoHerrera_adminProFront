import { Hospital } from './hospital.model';
interface DoctorUser{
    id: string,
    name: string,
    img: string,
}

export class Doctor {
    constructor(
        public name: string,
        public _id?: string,
        public user?: DoctorUser,
        public img?: string,
        public hospital?: Hospital
    ) {
        
    }
}