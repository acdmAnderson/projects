import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';
import { AuthService } from './services/auth/auth.service';
import { MainComponent } from './components/main/main.component';
import { RegisterModule } from './components/register/register.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,   
    RegisterModule, GraphQLModule, HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
