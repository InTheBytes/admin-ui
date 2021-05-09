import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseUserComponent } from './browse-user.component';

describe('BrowseUserComponent', () => {
  let component: BrowseUserComponent;
  let fixture: ComponentFixture<BrowseUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseUserComponent ]
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
