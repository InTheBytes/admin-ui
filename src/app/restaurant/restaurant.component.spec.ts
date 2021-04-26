import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { RestaurantComponent } from './restaurant.component';

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let fixture: ComponentFixture<RestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantComponent ],
      imports: [RouterTestingModule],
      providers: [
        RouterLinkWithHref
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render routerLinks', () => {
    const links = fixture.nativeElement.querySelectorAll('a')
    const creatorLink = links[0]
    const listingLink = links[1]

    expect(links).toHaveSize(2)

    expect(creatorLink['href']).toContain('/restaurants/creator')
    expect(listingLink['href']).toContain('/restaurants/listing')
  })
});
