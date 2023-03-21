import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css']
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    // const promise = new Promise( (resolve, reject) => {
      
    //   if (true) {
    //     resolve('Hello world');
    //   }else{
    //     reject('Something wrong');
    //   }

    // });

    // promise.then((response) => console.log('Finish promise ->', response))
    // .catch((error) => console.log('Error ->', error));

    // console.log('Ends init');
    this.getUsers().then((users) => console.log(users));
  }

  getUsers(){

    return new Promise( (resolve) => {
      fetch('https://reqres.in/api/users')
        .then(response => response.json())
        .then(body => resolve(body.data));
    });

  }

}
