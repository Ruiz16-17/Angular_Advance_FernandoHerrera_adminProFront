import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIamgeComponent } from './modal-iamge.component';

describe('ModalIamgeComponent', () => {
  let component: ModalIamgeComponent;
  let fixture: ComponentFixture<ModalIamgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalIamgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalIamgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
