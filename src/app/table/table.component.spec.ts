import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Page } from '../shared/model/page';
import { Listable, TableComponent } from './table.component';


describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  let content: any[] = [
    'hello',
    'goodbye'
  ]

  let mockConfig: Listable = {
    idProperty: '',
    nameProperty: '',
    columns: [],
    get: (page: number, size: number) => {return new Promise((resolve) => {
      let page = new Page()
      page.content = content
      resolve(page)
    })}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      providers: [
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.configuration = mockConfig
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
