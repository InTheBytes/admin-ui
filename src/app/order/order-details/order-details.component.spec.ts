import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderDetailsComponent } from './order-details.component';

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;

  let mockRouter = {}
  let mockActRoute = {
    snapshot: {
      paramMap: {
        get (path: string): string {return path}
      }
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailsComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: ActivatedRoute, useValue: mockActRoute}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
