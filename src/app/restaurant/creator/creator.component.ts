import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService
    ) { }

  ngOnInit(): void {
  }

}
