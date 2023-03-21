import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementerComponent } from '../incrementer/incrementer.component';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { DoughnutComponent } from '../doughnut/doughnut.component';
import { ModalIamgeComponent } from '../modal-iamge/modal-iamge.component';



@NgModule({
  declarations: [
    IncrementerComponent,
    DoughnutComponent,
    ModalIamgeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    IncrementerComponent,
    DoughnutComponent,
    ModalIamgeComponent
  ]
})
export class ComponentsModule { }
