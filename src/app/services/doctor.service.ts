import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

const urlBase = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private http: HttpClient
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  listDoctors(): Observable<Doctor[]> {
    const url = `${urlBase}/doctors`;
    return this.http.get<Doctor[]>(url, this.headers).pipe(
      map<any, Doctor[]>((response: any) => response.msg)
    );
  }

  getDoctorById(id: string): Observable<Doctor> {
    const url = `${urlBase}/doctors/${id}`;
    return this.http.get<Doctor>(url, this.headers).pipe(
      map<any, Doctor>((response: any) => response.msg)
    );
  }

  createDoctor(doctor: {name: string, hospital: string}): Observable<Doctor> {
    const url = `${urlBase}/doctors`;
    return this.http.post<Doctor>(url, doctor, this.headers).pipe(
      map((response: any) => response.doctor)
    );
  }

  updateDoctor(doctor: Doctor): Observable<Doctor> {
    const url = `${urlBase}/doctors/${doctor._id}`;
    return this.http.put<Doctor>(url, doctor, this.headers);
  }

  deleteDoctor(id: string): Observable<Doctor> {
    const url = `${urlBase}/doctors/${id}`;
    return this.http.delete<Doctor>(url, this.headers);
  }

}
