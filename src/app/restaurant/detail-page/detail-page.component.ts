import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Listable } from 'src/app/shared/component/listing/listing.component';
import { Food, Restaurant } from 'src/app/shared/model/restaurant';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';




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



  constructor(
    private restaurantService: RestaurantService,
    private actRoute: ActivatedRoute,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.message = ''
    this.success = false
    this.initRestaurant()
    this.restaurantService
      .getRestaurant(Number(this.actRoute.snapshot.paramMap.get("restaurantId")))
      .then((resp) => {         
        this.restaurant = resp;
        this.success = true;
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
      this.dataSource = this.restaurant.foods
  }


  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
    this.dataSource.paginator = this.paginator;
  }


  ngAfterContentChecked(){
    this.dataSource = new MatTableDataSource (this.restaurant.foods);
  
  }

 
  initRestaurant() {
    const empty = {
      restaurantId: -1, name: "", cuisine: "",
      location: {
        locationId: 0, unit: "", street: "", city: "", state: "", zipCode: null
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
    console.log("delete click");
    this.restaurant.foods.forEach((value,index)=>{
      if(value==this.activeRow) this.restaurant.foods.splice(index,1);
    });
  }

  newClick(){
    this.foodInput = {
      foodId: 0,
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
        foodId: 0,
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
    this.restaurantService.updateRestaurant(this.restaurant);
  }

}
