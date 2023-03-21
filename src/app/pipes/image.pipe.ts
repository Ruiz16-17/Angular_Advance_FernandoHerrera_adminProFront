import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string | undefined, type: 'users' | 'hospitals' | 'doctors'): string {

    if (!img) {
      return `${baseUrl}/upload/users/no-image`;
    }

    if (img?.includes('https')) {
      return img;
    }

    if (img) {
      return `${baseUrl}/upload/${type}/${img}`;
    } else {
      return `${baseUrl}/upload/users/no-image`;
    }
  }

}
