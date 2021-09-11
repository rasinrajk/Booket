import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './view/auth/register/register.component';
import { LoginComponent } from './view/auth/login/login.component';
import { ForgotpasswordComponent } from './view/auth/forgotpassword/forgotpassword.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { MailboxComponent } from './view/mailbox/mailbox.component';
import { SettingsComponent } from './view/settings/settings.component';
import { CalenderComponent } from './view/calender/calender.component';
import { AllusersComponent } from './view/allusers/allusers.component';
import { UserDetailsComponent } from './view/user-details/user-details.component';
import { ResetPasswordComponent } from './view/auth/reset-password/reset-password.component';
import { Page404Component } from './view/page404/page404.component';
import { AuthGuard } from './../guard/authGuard';
import { ListAdminComponent } from './view/list-admin/list-admin.component';
import { SecureOTPComponent } from './view/secure-otp/secure-otp.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
    // canActivate: [AuthGuard]
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgotPassword',
    component: ForgotpasswordComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mailbox',
    component: MailboxComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'calender',
    component: CalenderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'allUsers',
    component: AllusersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userDetails',
    component: UserDetailsComponent
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent
  },
  {
    path: 'listAdmin',
    component: ListAdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'enterOTP',
    component: SecureOTPComponent
  },
  {
    path: '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
