import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  //one way, other way is with observables

  async updateFile(
    file: File,
    type: 'users' | 'doctors' | 'hospitals',
    id: string
  ){

    try {

      const url = `${baseUrl}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await response.json();

      if(data.ok){
        return data.nameFile;
      }else{
        console.log(data.msg);
        return false;
      }

    }catch (error) {
      console.error(error);
      return false;
    }

  }

}
