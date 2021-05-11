import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  columnsToDisplay = ['name', 'price','actions'];
  expandedElement: Food | null;
  activeRow: Food;

  @ViewChild(MatTable, {static:false}) table: MatTable<any>;
  dataSource :any;
  @ViewChild(MatPaginator) paginator: MatPaginator;



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
    this.activeRow = e;
    console.log("row click:");
    console.log(e);
  }

  deleteClick(){
    console.log("delete click");
    this.restaurant.foods.forEach((value,index)=>{
      if(value==this.activeRow) this.restaurant.foods.splice(index,1);
    });
    this.dataSource = new MatTableDataSource (this.restaurant.foods);
  }

  newClick(){
    /*
    let dialogRef = this.dialog.open(DialogOverviewExample, {
      height: '400px',
      width: '600px',
    });
    */
  }

}

