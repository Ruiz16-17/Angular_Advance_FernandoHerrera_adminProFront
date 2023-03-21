import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

export class User {

    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public img?: string,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public google?: boolean,
        public uid?: string
    ) {

    }

    get imageUrl(): string {

        if (!this.img) {
            return `${baseUrl}/upload/users/no-image`;
        }

        if(this.img?.includes('https')){
            return this.img;
        }

        if (this.img) {
            return `${baseUrl}/upload/users/${this.img}`;
        }else{
            return `${baseUrl}/upload/users/no-image`;
        }
    }

}