import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './view/auth/register/register.component';
import { LoginComponent } from './view/auth/login/login.component';
import { ForgotpasswordComponent } from './view/auth/forgotpassword/forgotpassword.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { HeaderComponent } from './view/dashboard/header/header.component';
import { SidebarComponent } from './view/dashboard/sidebar/sidebar.component';
import { ContentComponent } from './view/dashboard/content/content.component';
import { MailboxComponent } from './view/mailbox/mailbox.component';
import { SettingsComponent } from './view/settings/settings.component';
import { CalenderComponent } from './view/calender/calender.component';
import { AllusersComponent } from './view/allusers/allusers.component';
import { UserDetailsComponent } from './view/user-details/user-details.component';
import { Page404Component } from './view/page404/page404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesComponent } from './common/control-messages/control-messages.component';
import { ApiService } from './services/api.service';
import { ResetPasswordComponent } from './view/auth/reset-password/reset-password.component';
import { ListAdminComponent } from './view/list-admin/list-admin.component';
import { AuthGuard } from './../guard/authGuard';
import { SecureOTPComponent } from './view/secure-otp/secure-otp.component';
import { AutoLogoutService } from './services/autologout.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotpasswordComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    MailboxComponent,
    SettingsComponent,
    CalenderComponent,
    AllusersComponent,
    UserDetailsComponent,
    Page404Component,
    ControlMessagesComponent,
    ResetPasswordComponent,
    ListAdminComponent,
    SecureOTPComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],

  providers: [ApiService, AuthGuard, AutoLogoutService],
  bootstrap: [AppComponent]
})
export class AppModule {}
