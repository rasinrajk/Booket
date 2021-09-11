import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ApiEndPoints } from 'src/app/utils/api.endpoints';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpOptions: any;
  constructor(private http: HttpClient, private router: Router) {}

  getheaders() {
    const tkn = localStorage.getItem('UserToken');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tkn
      })
    };
  }
  // Signup api call
  doSignup(data: any) {
    const params = {
      name: data.first_name,
      password: data.password,
      email: data.email
    };
    return this.http
      .post<any>(
        `${environment.apiUrl}/` + ApiEndPoints.signup,
        params,
        this.getheaders()
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }
  // Login api call
  doLogin(data: any) {
    const params = {
      email: data.email,
      password: data.password
    };
    return this.http
      .post<any>(
        `${environment.apiUrl}/` + ApiEndPoints.login,
        params,
        this.getheaders()
      )
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response

          const token = user['user']['tokens'];

          if (
            user['user']['tokens'] !== '' &&
            user['user']['twofaEnable'] === false
          ) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            // store user id in local storage to keep user logged in between page refreshes
            localStorage.setItem(
              'UserToken',
              JSON.stringify(token[token.length - 1].token).slice(1, -1)
            );
          } else if (
            !user['user'].hasOwnProperty('token') &&
            user['user']['twofaEnable']
          ) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            // store user id in local storage to keep user logged in between page refreshes
            localStorage.setItem(
              'currentUserID',
              JSON.stringify(user['user']['_id'])
            );

            return user;
          }
          return user;
        })
      );
  }

  // Forgot password api call
  forgotPassword(mail: string) {
    const params = {
      email: mail
    };
    return this.http
      .post<any>(
        `${environment.apiUrl}/` + ApiEndPoints.forgotPassword,
        params,
        this.getheaders()
      )
      .pipe(
        map(response => {
          console.log(response);
          return response;
        })
      );
  }
  // Logout api call
  logout() {
    return this.http
      .post<any>(
        `${environment.apiUrl}/` + ApiEndPoints.logout,
        {},

        this.getheaders()
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  // Reset Password api call
  doReset(data: any, usertoken: string) {
    const params = {
      password: data.password
    };
    console.log(params);
    return this.http
      .post<any>(
        `${environment.apiUrl}/` + ApiEndPoints.resetPassword + usertoken,
        params,
        this.httpOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  // get all user list api call

  getAllusers() {
    return this.http
      .get<any>(
        `${environment.apiUrl}/` + ApiEndPoints.listUsers,
        this.getheaders()
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }
  // get total user count api call

  allUserCount() {
    return this.http
      .get<any>(
        `${environment.apiUrl}/` + ApiEndPoints.allUserCount,
        this.getheaders()
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }
  // get total Logged in user count api call

  allLoggedUserCount() {
    return this.http
      .get<any>(
        `${environment.apiUrl}/` + ApiEndPoints.allUserLoggedInCount,
        this.getheaders()
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }
  // get total varified user count api call

  varifiedUserCount() {
    return this.http
      .get<any>(
        `${environment.apiUrl}/` + ApiEndPoints.allUserLoggedInCount,
        this.getheaders()
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }
  // search user

  searchUsers(userLetter: any) {
    const params = {
      searchKey: userLetter
    };
    console.log(params);
    return this.http
      .post<any>(
        `${environment.apiUrl}/` + ApiEndPoints.searchUsers,
        params,
        this.httpOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }
  // list all Admin list api call

  listallAdmin() {
    return this.http
      .get<any>(
        `${environment.apiUrl}/` + ApiEndPoints.listalladmin,
        this.getheaders()
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }
  // get total admin count api call

  toatalAdminCount() {
    return this.http
      .get<any>(
        `${environment.apiUrl}/` + ApiEndPoints.totalAdminCount,
        this.getheaders()
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }
  // get total logged in admin api call

  allLoggedAdminCount() {
    return this.http
      .get<any>(
        `${environment.apiUrl}/` + ApiEndPoints.totalAdminLoggedInCount,
        this.getheaders()
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  // search admin

  searchAdmin(userLetter: any) {
    const params = {
      searchKey: userLetter
    };
    console.log(params);
    return this.http
      .post<any>(
        `${environment.apiUrl}/` + ApiEndPoints.searchAdmin,
        params,
        this.httpOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }
  // Change user role api call

  changeuserstatus(data: any) {
    const params = {
      userid: data
    };

    return this.http
      .post<any>(
        `${environment.apiUrl}/` + ApiEndPoints.changeUserRole,
        params,
        this.getheaders()
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  // enable 2fa api call
  enable2fa() {
    return this.http
      .get<any>(
        `${environment.apiUrl}/` + ApiEndPoints.Enable2Fa,
        this.getheaders()
      )

      .pipe(
        map(response => {
          return response;
        })
      );
  }
  // Confirmation for two factor authentication api call
  Confirm2factorAuth(data: any) {
    const params = {
      otp: data
    };

    return this.http
      .post<any>(
        `${environment.apiUrl}/` + ApiEndPoints.ConfirmEnable2Fa,
        params,
        this.getheaders()
      )

      .pipe(
        map(response => {
          return response;
        })
      );
  }
  // loginwithOTP api call
  loginwithOTP(data: any) {
    const crntUserID = JSON.parse(localStorage.getItem('currentUserID'));
    const params = {
      otp: data,
      userid: crntUserID
    };

    return this.http
      .post<any>(
        `${environment.apiUrl}/` + ApiEndPoints.loginOTP,
        params,
        this.getheaders()
      )

      .pipe(
        map(response => {
          return response;
        })
      );
  }
  // confirmation for disable two factor authentication api call
  Confirm2disable2Fa(userotp: any, userID: any) {
    const params = {
      otp: userotp,
      userid: userID
    };

    return this.http
      .post<any>(
        `${environment.apiUrl}/` + ApiEndPoints.disable2Fa,
        params,

        this.getheaders()
      )

      .pipe(
        map(response => {
          return response;
        })
      );
  }
  // Delete user api call
  deleteUser(userId: any) {
    const params = {
      userid: userId
    };

    return this.http
      .post<any>(
        `${environment.apiUrl}/` + ApiEndPoints.deleteUser,
        params,
        this.getheaders()
      )

      .pipe(
        map(response => {
          return response;
        })
      );
  }

  // delete admin api call
  deleteAdmin(adminId: any) {
    const params = {
      adminid: adminId
    };

    return this.http
      .post<any>(
        `${environment.apiUrl}/` + ApiEndPoints.deleteAdmin,
        params,
        this.getheaders()
      )

      .pipe(
        map(response => {
          return response;
        })
      );
  }
}
