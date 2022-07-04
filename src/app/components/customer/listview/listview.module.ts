import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListviewComponent} from "./listview.component";
import {MatTableModule} from "@angular/material/table";



@NgModule({
  declarations: [ListviewComponent],
  imports: [
    CommonModule,
    MatTableModule,
  ]
})
export class ListviewModule { }
