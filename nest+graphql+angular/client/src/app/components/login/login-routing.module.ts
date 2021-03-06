import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoverPasswordComponent } from '../password/recover-password/recover-password.component';
import { RegisterComponent } from '../register/register.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'recover/password',
    component: RecoverPasswordComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
