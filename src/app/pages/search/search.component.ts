import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SearchsService } from 'src/app/services/searchs.service';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public users: User[] = [];
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({search}) => this.globalSearch(search));
  }

  globalSearch(search: string): void {
    this.searchService.globalSearch(search)
      .subscribe((response: any) => {
        this.users = response.user;
        this.doctors = response.doctors;
        this.hospitals = response.hospitals;
      });
  }

  openDoctor(doctor: Doctor): void{
    
  }

}
