import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { delay, Subscription } from 'rxjs';
import { SearchsService } from 'src/app/services/searchs.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private hospitalsService: HospitalService,
    private modalImageService: ModalImageService,
    private searchService: SearchsService,
  ) { }

  ngOnInit(): void {
    this.listHospitals();
    this.imgSubs = this.modalImageService.newImageChanged.pipe(
      delay(500)
    )
      .subscribe(() => this.listHospitals());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  listHospitals(): void {
    this.loading = false;
    this.hospitalsService.listhospitals()
      .subscribe(response => {
        this.hospitals = response;
        this.loading = false;
      });
  }

  updateHospital(hospital: Hospital) {
    this.hospitalsService.updateHospital(hospital._id!, hospital.name)
      .subscribe(response => {
        this.listHospitals();
        Swal.fire('Updated', hospital.name, 'success');
      });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalsService.deleteHospital(hospital._id!)
      .subscribe(response => {
        this.listHospitals();
        Swal.fire('Deleted', hospital.name, 'success');
      });
  }

  async openSweetAlert() {
    const { value } = await Swal.fire<string>({
      title: 'Create new hospital',
      text: 'Write the name',
      input: 'text',
      inputPlaceholder: 'Hospital name',
      showCancelButton: true
    });

    if (value?.trim()) {
      if (value.trim().length > 0) {
        this.hospitalsService.createHospital(value)
          .subscribe(response => {
            console.log(response);
            this.hospitals.push(response);
          })
      }
    }
  }

  openImageModal(hospital: Hospital) {
    this.modalImageService.openModal('hospitals', hospital._id!, hospital.img);
  }

  search(search: string) {
    if (search.length > 0) {
      this.searchService.search('hospitals', search)
        .subscribe(response => {
          this.hospitals = response;
        });
    }else{
      this.listHospitals();
    }
  }

}
