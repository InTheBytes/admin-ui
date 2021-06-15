import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/model/order';
import { OrderWizardService } from '../order-wizard.service';

import { DetailFormComponent } from './detail-form.component';

describe('DetailFormComponent', () => {
  let component: DetailFormComponent;
  let fixture: ComponentFixture<DetailFormComponent>;

  let router = jasmine.createSpyObj('Router', ['method'])
  class mockWizard {
    order: Order = {
      status: '0 - created',
      destination: {
        unit: '',
        street: '',
        city: '',
        state: '',
        zipCode: 0
      },
      items: []
    }
    statesList() {return []}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailFormComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        FormBuilder,
        {provide: OrderWizardService, useValue: mockWizard}
      ]
    })
    .compileComponents();

    let service = TestBed.inject(OrderWizardService)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
