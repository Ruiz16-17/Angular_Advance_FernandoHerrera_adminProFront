import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal = true;
  public type!: 'users' | 'doctors' | 'hospitals';
  public id!: string;
  public img!: string;
  public newImageChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get hideModal() {
    return this._hideModal;
  }

  openModal(type: 'users' | 'doctors' | 'hospitals', id: string, img: string = 'no-image'): void {
    this._hideModal = false;
    this.type = type;
    this.id = id;
    
    if (img.includes('https')) {
      this.img = img;
    }else {
      this.img = `${baseUrl}/upload/${type}/${img}`
    }

  }

  closeModal(): void {
    this._hideModal = true;
  }
}
