import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const urlBase = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  listhospitals(): Observable<Hospital[]> {
    const url = `${urlBase}/hospitals`;
    return this.http.get<Hospital[]>(url, this.headers).pipe(
      map<any, Hospital[]>( (response:any) => response.msg)
    );
  }

  createHospital(name: string): Observable<Hospital>{
    const url = `${urlBase}/hospitals`;
    return this.http.post<Hospital>(url, {name: name}, this.headers).pipe(
      map((response: any) => response.hospital)
    );
  }

  updateHospital(id: string, name: string): Observable<Hospital>{
    const url = `${urlBase}/hospitals/${id}`;
    return this.http.put<Hospital>(url, {name: name}, this.headers);
  }

  deleteHospital(id: string): Observable<Hospital>{
    const url = `${urlBase}/hospitals/${id}`;
    return this.http.delete<Hospital>(url, this.headers);
  }
}
