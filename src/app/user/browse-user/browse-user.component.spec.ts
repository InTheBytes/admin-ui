import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { BrowseUserComponent } from './browse-user.component';

describe('BrowseUserComponent', () => {
  let component: BrowseUserComponent;
  let fixture: ComponentFixture<BrowseUserComponent>;

  let mockRoute = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseUserComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: Router, useValue: mockRoute}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
