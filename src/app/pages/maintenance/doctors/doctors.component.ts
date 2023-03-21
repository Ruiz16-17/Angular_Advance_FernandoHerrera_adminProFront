import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public loading: boolean = true;
  public doctors: Doctor[] = [];
  public imgSubs!: Subscription;

  constructor(
    private doctorService: DoctorService,
    private modalImageService: ModalImageService,
    private searchService: SearchsService
  ) { }

  ngOnInit(): void {
    this.listDoctors();
    this.imgSubs = this.modalImageService.newImageChanged.pipe(
      delay(500)
    )
      .subscribe(() => this.listDoctors());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  listDoctors(): void {
    this.loading = true;
    this.doctorService.listDoctors()
      .subscribe(doctors => {
        this.loading = false;
        this.doctors = doctors;
      });
  }

  openImageModal(doctor: Doctor) {
    this.modalImageService.openModal('doctors', doctor._id!, doctor.img);
  }

  updateDoctor(doctor: Doctor) {
    this.doctorService.updateDoctor(doctor)
      .subscribe(response => {
        this.listDoctors();
        Swal.fire('Updated', doctor.name, 'success');
      });
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(doctor._id!)
          .subscribe(response => {
            this.listDoctors();
            Swal.fire('Deleted', doctor.name, 'success');
          });
      }
    });
  }

  search(search: string) {
    if (search.length > 0) {
      this.searchService.search('doctors', search)
        .subscribe(response => {
          this.doctors = response;
        });
    } else {
      this.listDoctors();
    }
  }
}
