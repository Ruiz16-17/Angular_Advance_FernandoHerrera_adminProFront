import { Component, OnInit } from '@angular/core';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-iamge',
  templateUrl: './modal-iamge.component.html',
  styleUrls: ['./modal-iamge.component.css']
})
export class ModalIamgeComponent implements OnInit {

  public imageToUpload!: File;
  public imgTemp: any = null;

  constructor(
    public modalImageService: ModalImageService,
    public fileUploadService: UploadFileService
    ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.imgTemp = null;
    this.modalImageService.closeModal();
  }

  changeImage(file: File) {
    this.imageToUpload = file;
    if (!file) {
      this.imgTemp = null
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.imgTemp = reader.result;
    };
  }

  uploadImage(){

    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService.updateFile(this.imageToUpload, type, id)
      .then(img => {
        Swal.fire('saved', 'Changed has been saved', 'success');
        this.modalImageService.newImageChanged.emit(img);
        this.closeModal();
      })
      .catch(error => Swal.fire('Error', 'The image cannot be uploaded', 'error'));
  }

}
