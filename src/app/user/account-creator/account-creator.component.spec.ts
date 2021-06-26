import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountCreatorComponent } from './account-creator.component';

describe('AccountCreatorComponent', () => {
  let component: AccountCreatorComponent;
  let fixture: ComponentFixture<AccountCreatorComponent>;

  let mockRouter = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCreatorComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        FormBuilder,
        {provide: Router, useValue: mockRouter}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
