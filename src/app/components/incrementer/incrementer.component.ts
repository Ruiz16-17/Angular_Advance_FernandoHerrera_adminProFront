import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styleUrls: ['./incrementer.component.css']
})
export class IncrementerComponent implements OnInit {

  @Input('value') progress: number = 0;
  @Input() btnClass: string = 'btn-primary';

  @Output() valueEmitter: EventEmitter<number> = new EventEmitter();
  isValueValid: boolean = true;

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  changePercent(percent: number) {

    if (this.progress >= 100 && percent >= 0) {
      this.valueEmitter.emit(100);
      this.progress = 100;
    } else if (this.progress <= 0 && percent <= 0) {
      this.valueEmitter.emit(0);
      this.progress = 0;
    } else {
      this.progress += percent;
      this.valueEmitter.emit(this.progress);
    }
  }

  onChange(value: number){
    
    if (value >= 100) {
      this.progress = 100;
      this.isValueValid = false;
    }else if (value <= 0) {
      this.progress = 0;
      this.isValueValid = false;
    }else {
      this.progress = value;
      this.isValueValid = true;
    }

    this.valueEmitter.emit(this.progress);
  }

}
