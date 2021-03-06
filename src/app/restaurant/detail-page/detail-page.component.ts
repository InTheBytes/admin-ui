
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Food, Restaurant } from 'src/app/shared/model/restaurant';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Role, User } from 'src/app/shared/model/user';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Listable } from 'src/app/table/table.component';




@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class DetailPageComponent implements OnInit {

  restaurant: Restaurant;
  message: string;
  success: boolean;
  listConfig: Listable;
  pageSize: number;
  columnsToDisplay = ['name', 'price'];
  expandedElement: Food | null;
  activeRow: Food;
  foodName: string;
  foodPrice: number;
  foodDescription: string;
  foodInput: Food;

  @ViewChild(MatTable, {static:false}) table: MatTable<any>;
  dataSource :any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('newFoodModal') newFoodModal: TemplateRef<any>;
  @ViewChild('editFoodModal') editFoodModal: TemplateRef<any>;

  // managersConfig: Listable = {
  //   idProperty: 'userId',
  //   nameProperty: 'username',
  //   columns: [
  //     {}
  //   ],
  //   get: () => {return new Promise((resolve, reject) => { resolve()})}
  // }

  // getManagers = (page: number, pageSize: number): Promise<Page<User>> => {
  //   return new Promise((res, rej) => { 
  //     if (typeof this.restaurant.managers != 'undefined' )
  //     resolve(this.restaurant.managers)
  //   })
  // }


  users: User[]
  modalRef: NgbModalRef
  adjustmentSuccess: boolean
  hasManagers: boolean

  role: Role = {
    roleId: "2",
    name: 'restaurant'
  }

  constructor(
    private restaurantService: RestaurantService,
    private actRoute: ActivatedRoute,
    public dialog: MatDialog,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.message = ''
    this.success = false
    this.adjustmentSuccess = true
    this.hasManagers = false
    this.restaurantService
      .getRestaurant(this.actRoute.snapshot.paramMap.get("restaurantId"))
      .then((resp) => {         
        this.restaurant = resp;
        this.users = resp.managers
        this.success = true
        this.hasManagers = (typeof this.users !== 'undefined' && this.users.length > 0)
        this.dataSource = this.restaurant.foods
      },
      (err) => {
        switch (err.status) {
          case 404:
            this.message =
            "404: This restaurant doesn't seem to exist"
            break;
          case 500:
            this.message = 'Something went wrong fetching the restaurant from the server'
            break;
          default:
            this.message = 
            "An unexpected error occured. Perhaps there's a problem with the connection"
        }
      })
  }


  ngAfterViewInit() {
    if (typeof this.table != 'undefined') {
      this.table.dataSource = this.dataSource;
    }
    this.dataSource.paginator = this.paginator;
  }


  ngAfterContentChecked(){
    let source: any[]
    if (typeof this.restaurant == 'undefined' || typeof this.restaurant.foods == 'undefined') {
      source = []
    } else {
      source = this.restaurant.foods
    }
      this.dataSource = new MatTableDataSource (source);
  
  }

 
  initRestaurant() {
    const empty = {
      restaurantId: "-1", name: "", cuisine: "", managers: [],
      location: {
        locationId: "0", unit: "", street: "", city: "", state: "", zipCode: null
      },
      foods: []
    }
    this.restaurant = empty;
  }

  rowClick(e){
    if (this.activeRow === e){
      this.activeRow = null;
    } else {
      this.activeRow = e;
    }
  }

  deleteClick(){
    this.restaurant.foods.forEach((value,index)=>{
      if(value==this.activeRow) this.restaurant.foods.splice(index,1);
    });
  }

  newClick(){
    this.foodInput = {
      foodId: '',
      name: "",
      price: 0,
      description: ""
    }
    const newDialogRef = this.dialog.open(this.newFoodModal, {
      width: '250px',
      data: this.foodInput
    });

    newDialogRef.afterClosed().subscribe(result => {
      this.foodInput.name = this.foodName;
      this.foodInput.price = this.foodPrice;
      this.foodInput.description = this.foodDescription;
      this.foodName = "";
      this.foodPrice = null;
      this.foodDescription = "";
    });
  }

  addClick(){
    this.dialog.closeAll();
    this.restaurant.foods.push(this.foodInput);
  }

  cancelClick(){
    this.dialog.closeAll();
  }

  editClick(){
    if (this.activeRow != null) {
      this.foodName = this.activeRow.name;
      this.foodPrice = this.activeRow.price;
      this.foodDescription = this.activeRow.description;

      this.foodInput = {
        foodId: '',
        name: "",
        price: 0,
        description: ""
      }
      const editDialogRef = this.dialog.open(this.editFoodModal, {
        width: '250px',
        data: this.foodInput
      });

      editDialogRef.afterClosed().subscribe(result => {
        this.foodInput.name = this.foodName;
        this.foodInput.price = this.foodPrice;
        this.foodInput.description = this.foodDescription;
        this.foodName = "";
        this.foodPrice = null;
        this.foodDescription = "";
      });
    }
  }

  confirmEditClick(){
    this.restaurant.foods.forEach((value,index)=>{
      if(value==this.activeRow) this.restaurant.foods.splice(index,1);
    });
    this.dialog.closeAll();
    this.restaurant.foods.push(this.foodInput);

  }

  saveChangesClick(){
    this.restaurantService.updateRestaurant(this.restaurant.restaurantId, this.restaurant);
  }

  removeManager(user: User) {
    this.restaurantService.removeManager(this.restaurant.restaurantId, user).then(
      (resp) => {
        this.restaurant = resp
        this.users = resp.managers
        this.hasManagers = (typeof this.users !== 'undefined' && this.users.length > 0)
      },
      (err) => {
        this.tempError("Failed to remove manager")
      }
    )
  }

  tempError(message: string) {
    this.message = `Error: ${message}`
    this.adjustmentSuccess = false
    setTimeout(() => {
      this.adjustmentSuccess = true
    }, 45000)
  }

  addManager(userPromise: Promise<User>) {
    userPromise.then(
      (resp) => {
        this.restaurantService.addManager(this.restaurant.restaurantId, resp).then(
          (resp) => {
            this.restaurant = resp
            this.users = resp.managers
            this.hasManagers = (typeof this.users !== 'undefined' && this.users.length > 0)
          },
          (err) => {
            this.tempError("Failed to add manager")
          }
        )
      },
      (err) => {}
    )
  }

  addManagerClick(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content)
    this.modalRef.result.then(
      (result) => {
        this.restaurantService.getRestaurant(this.restaurant.restaurantId).then(
          (resp) => {
            this.restaurant = resp
          },
          (err) => { }
        )
      },
      (reason) => { }
    )
  }
}
