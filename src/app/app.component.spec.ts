import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing'
import { RouterLinkWithHref } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        RouterLinkWithHref
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'admin-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('admin-ui');
  });

  it('should render navlinks', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const nav = compiled.querySelectorAll('.nav-link')
    expect(nav[1].textContent).toContain('Restaurants');
  });

  it('should route to restaurant from nav', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const links = fixture.nativeElement.querySelectorAll('a')
    const restaurantLink = links[1]
    expect(links).toHaveSize(2)
    
    expect(restaurantLink.getAttribute('routerLink')).toContain('/restaurants')
  })
});
