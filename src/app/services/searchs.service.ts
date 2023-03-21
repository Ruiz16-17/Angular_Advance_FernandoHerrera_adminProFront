import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Hospital } from '../models/hospital.model';
import { User } from '../models/user.model';
import { Doctor } from '../models/doctor.model';

const urlBase = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SearchsService {

  constructor(private http: HttpClient) { }

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

  search(type: 'users' | 'doctors' | 'hospitals', search = ''): Observable<any> {
    const url = `${urlBase}/all/collections/${type}/${search}`;
    return this.http.get(url, this.headers).pipe(
      map((response: any) => {
        switch (type) {
          case 'users':
            return this.transformUsers(response.results);
          case 'hospitals':
            return this.transformHospital(response.results);
          case 'doctors':
            return this.transformDoctor(response.results);
          default:
            return [];
        }
      })
    );
  }

  private transformUsers(results: any[]): User[] {
    return results.map(user => new User(
      user.name,
      user.email,
      user.password,
      user.img,
      user.role,
      user.google,
      user.uid
    ));
  }

  private transformHospital(results: any[]): Hospital[] {
    return results.map(hospital => new Hospital(
      hospital.name,
      hospital._id,
      hospital.user,
      hospital.img
    ));
  }

  private transformDoctor(results: any[]): Doctor[] {
    return results.map(doctor => new Doctor(
      doctor.name,
      doctor._id,
      doctor.user,
      doctor.img,
      doctor.hospital
    ));
  }

  globalSearch(searchTerm: string){
    const url = `${urlBase}/all/${searchTerm}`;
    return this.http.get<any[]>(url, this.headers);
  }

}
