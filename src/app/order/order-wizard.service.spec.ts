import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/backend-core/api.service';
import { BackendService } from 'src/app/shared/services/backend-core/backend.service';
import { OrderService } from 'src/app/shared/services/order.service';

import { OrderWizardService } from './order-wizard.service';

describe('OrderChangeService', () => {
  let service: OrderWizardService;
  let apiMock = {}
  let routerMock = {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: apiMock },
        { provide: Router, useValue: routerMock },
        OrderWizardService
      ]
    });
    service = TestBed.inject(OrderWizardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
