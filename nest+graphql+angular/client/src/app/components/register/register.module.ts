import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,  
    FormsModule    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterModule { }
