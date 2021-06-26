import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { BrowseOrderComponent } from './browse-order.component';

describe('BrowseOrderComponent', () => {
  let component: BrowseOrderComponent;
  let fixture: ComponentFixture<BrowseOrderComponent>;

  let mockRouter = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseOrderComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: Router, useValue: mockRouter}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
