import { NgModule } from '@angular/core';
import { AddressPipe } from './address.pipe';
import { StatusPipe } from './status.pipe';



@NgModule({
  declarations: [
    AddressPipe,
    StatusPipe
  ],
  imports: [ ],
  exports: [
    AddressPipe,
    StatusPipe
  ]
})
export class PipesModule { 
  static forRoot() {
    return {
      NgModule: PipesModule,
      providers: []
    }
  }
}
