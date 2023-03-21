import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../../services/hospital.service';
import { Hospital } from '../../../../models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/models/doctor.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];
  public selectedHospital: Hospital | undefined = {
    name: ''
  };
  public selectedDoctor: Doctor = {
    name: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.doctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    });

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => this.getDoctor(id));

    this.listHospitals();

    this.doctorForm.get('hospital')?.valueChanges
      .subscribe(hospitalId => {
        this.selectedHospital = this.hospitals.find(hospital => hospital._id === hospitalId);
      });
  }

  getDoctor(id: string) {
    if(id === 'new'){
      return;
    }
    this.doctorService.getDoctorById(id)
      .subscribe(doctor => {
        if(!doctor){
          this.router.navigateByUrl(`/dashboard/doctors`);
        }
        this.selectedDoctor = doctor;
        this.doctorForm.setValue({
          name: doctor.name,
          hospital: doctor.hospital?._id
        });
      });
  }

  listHospitals(): void {
    this.hospitalService.listhospitals()
      .subscribe((hospital: Hospital[]) => {
        this.hospitals = hospital;
      });
  }

  saveDoctor() {

    if (this.selectedDoctor) {
      const data = {
        ...this.doctorForm.value,
        _id: this.selectedDoctor._id
      }
      this.doctorService.updateDoctor(data)
        .subscribe(response => {
          Swal.fire('Saved', response.name, 'success');
        });
    } else {

      this.doctorService.createDoctor(this.doctorForm.value)
        .subscribe((response: Doctor) => {
          Swal.fire('Saved', response.name, 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${response._id}`)
        });
    }

  }

}
