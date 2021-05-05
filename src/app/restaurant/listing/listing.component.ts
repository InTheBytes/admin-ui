// import {
//   ChangeDetectorRef,
//   Component,
//   OnInit,
//   TemplateRef,
// } from '@angular/core';
// import {
//   FormBuilder,
//   FormControl,
//   FormGroup,
//   Validators,
// } from '@angular/forms';
// import { Restaurant } from 'src/app/shared/model/restaurant';
// import { RestaurantService } from 'src/app/shared/services/restaurant.service';
// import {
//   NgbModal,
//   NgbModalRef,
// } from '@ng-bootstrap/ng-bootstrap';
// import { PaginationService } from 'src/app/shared/services/pagination.service';

// @Component({
//   selector: 'app-listing',
//   templateUrl: './listing.component.html',
//   styleUrls: ['./listing.component.css'],
// })
// export class ListingComponent implements OnInit {
//   loaded: Boolean;
//   message: string;

//   restaurants: Restaurant[];
//   restaurantsMaster: Restaurant[];
//   pageSize: number;
//   page: number;
//   totalPages: number;

//   searchRestaurantForm: FormGroup;
//   searchString: string;

//   deleteRestaurantForm: FormGroup;
//   deleteName: string;
//   deleteId: number;
//   deleteConfirm: string;

//   modalRef: NgbModalRef;
//   closeResult: string;
//   failMessage: string;
  

//   constructor(
//     private restaurantService: RestaurantService,
//     private fb: FormBuilder,
//     private modalService: NgbModal,
//     private pagerService: PaginationService
//   ) {}

//   ngOnInit(): void {
//     this.loaded = false
//     this.message = 'Loading...'
//     // this.initializeRestaurants();
//     this.initializeRestaurantPage()
//     this.loaded = true
//     this.initializeForms()
//     this.page = 1
//   }

//   initializeRestaurantPage() {
//     this.pagerService.initialize(this.restaurantService.getAllRestaurants, 10)
//     this.page = this.pagerService.currentPage
//     this.pageSize = this.pagerService.pageSize
//     this.totalPages = this.pagerService.totalPages
//   }

//   // initializeRestaurants() {
//   //   this.pageSize = 10
//   //   this.restaurantService.getAllRestaurants(10, this.page).subscribe(
//   //     (resp) => {
//   //       this.restaurantsMaster = resp.body;
//   //       this.totalPages = resp.headers.get('total-pages');
//   //       this.restaurants = this.restaurantsMaster;
//   //       if (this.restaurants.length < 10) {
//   //         this.pageSize = this.restaurants.length;
//   //       } else {
//   //         this.pageSize = 10;
//   //       }
//   //       this.loaded = true;
//   //     },
//   //     (err) => {
//   //       switch (err.error.status) {
//   //         case 404:
//   //           this.message =
//   //           "There may be a problem. It doesn't look like there's any restaurants"
//   //           break;
//   //         case 500:
//   //           this.message = 'Sorry, something went wrong with the server'
//   //           break;
//   //         default:
//   //           this.message = 
//   //           "An unexpected error has occured. Perhaps there's a problem with the connection"
//   //       }
//   //     }
//   //   );
//   // }

//   onPageChange() {

//   }

//   initializeForms() {
//     this.searchRestaurantForm = new FormGroup({
//       searchString: new FormControl(this.searchString, [
//         Validators.maxLength(35),
//       ]),
//     });
//     this.deleteRestaurantForm = new FormGroup({
//       deleteId: new FormControl(this.deleteId, [Validators.required]),
//       deleteName: new FormControl(this.deleteName, [Validators.required]),
//       deleteConfirm: new FormControl(this.deleteConfirm, [Validators.required]),
//     });
//   }

//   searchRestaurants() {
//     this.restaurants = this.restaurantsMaster;
//     this.restaurants = this.restaurants.filter((x) => {
//       return (
//         x.name
//           .toLowerCase()
//           .search(this.searchRestaurantForm.value.searchString.toLowerCase()) != -1
//       );
//     });
//   }

//   open(content: TemplateRef<any>, fail: TemplateRef<any>, obj: Restaurant, index: number) {
//     this.deleteRestaurantForm = this.fb.group({
//       deleteId: obj.restaurantId,
//       deleteName: obj.name,
//       deleteConfirm: '',
//     });
//     this.deleteName = obj.name;

//     this.modalRef = this.modalService.open(content);
//     this.modalRef.result.then(
//       (result) => {
//         if (this.deleteRestaurantForm.value.deleteConfirm === this.deleteName) {
//           this.deleteRestaurant(obj.restaurantId, fail, index);
//         } else {
//           this.failMessage = "The name you entered did not match"
//           this.modalRef = this.modalService.open(fail)
//         }
//       },
//       (reason) => {}
//     );
//   }

  
// }
