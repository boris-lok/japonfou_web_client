import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorComponent} from "./editor.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
})
export class EditorModule {
}
