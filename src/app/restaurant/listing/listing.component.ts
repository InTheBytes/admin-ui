import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Restaurant } from 'src/app/shared/model/restaurant';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import {
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent implements OnInit {
  loaded: Boolean;
  message: string;

  restaurants: Restaurant[];
  restaurantsMaster: Restaurant[];
  pageSize: number;
  page: number;

  searchRestaurantForm: FormGroup;
  searchString: string;

  deleteRestaurantForm: FormGroup;
  deleteName: string;
  deleteId: number;
  deleteConfirm: string;

  private modalRef: NgbModalRef;
  closeResult: string;
  failMessage: string;

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loaded = false;
    this.message = 'Loading...';
    this.initializeRestaurants();
    this.initializeForms();
    this.page = 1;
  }

  initializeRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      (resp) => {
        this.restaurantsMaster = resp;
        this.restaurants = this.restaurantsMaster;
        if (this.restaurants.length < 10) {
          this.pageSize = this.restaurants.length;
        } else {
          this.pageSize = 10;
        }
        this.loaded = true;
      },
      (err) => {
        switch (err.error.status) {
          case 404:
            this.message =
            "There may be a problem. It doesn't look like there's any restaurants"
            break;
          case 500:
            this.message = 'Sorry, something went wrong with the server'
            break;
          default:
            this.message = 
            "An unexpected error has occured. Perhaps there's a problem with the connection"
        }
      }
    );
  }

  initializeForms() {
    this.searchRestaurantForm = new FormGroup({
      searchString: new FormControl(this.searchString, [
        Validators.maxLength(35),
      ]),
    });
    this.deleteRestaurantForm = new FormGroup({
      deleteId: new FormControl(this.deleteId, [Validators.required]),
      deleteName: new FormControl(this.deleteName, [Validators.required]),
      deleteConfirm: new FormControl(this.deleteConfirm, [Validators.required]),
    });
  }

  searchRestaurants() {
    this.restaurants = this.restaurantsMaster;
    this.restaurants = this.restaurants.filter((x) => {
      return (
        x.name
          .toLowerCase()
          .search(this.searchRestaurantForm.value.searchString.toLowerCase()) != -1
      );
    });
  }

  open(content: TemplateRef<any>, fail: TemplateRef<any>, obj: Restaurant, index: number) {
    this.deleteRestaurantForm = this.fb.group({
      deleteId: obj.restaurantId,
      deleteName: obj.name,
      deleteConfirm: '',
    });
    this.deleteName = obj.name;

    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {
        if (this.deleteRestaurantForm.value.deleteConfirm === this.deleteName) {
          this.deleteRestaurant(obj.restaurantId, fail, index);
        } else {
          this.failMessage = "The name you entered did not match"
          this.modalRef = this.modalService.open(fail)
        }
      },
      (reason) => {}
    );
  }

  deleteRestaurant(id: number, failModal: TemplateRef<any>, index: number) {
    this.restaurantService.deleteRestaurant(id).subscribe(
      (resp) => {
        this.restaurantsMaster.splice(index, 1);
        this.searchRestaurants();
      },
      (err) => {
        switch (err.status) {
          case 404:
            this.failMessage =
            "It looks like this restaurant no longer exists anyway"
            break;
          case 500:
            this.failMessage = 'Something went wrong with the server'
            break;
          default:
            this.failMessage = 
            "An unexpected error occured. Perhaps there's a problem with the connection"
        }
        this.modalRef = this.modalService.open(failModal)
      });
  }
}
