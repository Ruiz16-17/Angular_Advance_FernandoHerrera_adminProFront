import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { UploadFileService } from 'src/app/services/upload-file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileForm!: FormGroup;
  public user!: User;
  public imageToUpload!: File;
  public imgTemp: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private fileUploadService: UploadFileService
  ) {
    this.user = userService.user;
  }
  
  ngOnInit(): void {
    
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });

  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value)
      .subscribe(() => {
        const {name, email} = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;

        Swal.fire('saved', 'Changed has been saved', 'success');
      }, error => {
        Swal.fire('Error', error.error.msg, 'error');
      });
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
    this.fileUploadService.updateFile(this.imageToUpload, 'users', this.user.uid!)
      .then(img => {
        this.user.img = img;
        Swal.fire('saved', 'Changed has been saved', 'success');
      })
      .catch(error => Swal.fire('Error', 'The image cannot be uploaded', 'error'));
  }

}
