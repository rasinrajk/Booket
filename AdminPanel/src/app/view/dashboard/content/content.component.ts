import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  totalUser;
  totalLoggedInUser;
  totalVarifiedUser;
  totalAdmin;
  totalAdminActive;
  userRole;
  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  ngOnInit() {
    const retrievedData = JSON.parse(localStorage.getItem('currentUser'));
    this.userRole = retrievedData['user']['role'];
    if (this.userRole === 'admin') {
      this.allUserCount();
      this.allLoggedUserCount();
      this.varifiedUserCount();
    } else if (this.userRole === 'superadmin') {
      this.allUserCount();
      this.allLoggedUserCount();
      this.varifiedUserCount();
      this.totalAdminCount();
      this.allLoggedAdminCount();
    }
  }
  // total user
  allUserCount() {
    this.apiService.allUserCount().subscribe(
      (users: any) => {
        if (users.status) {
          this.totalUser = users.count;
        }
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }
  // total Logged user
  allLoggedUserCount() {
    this.apiService.allLoggedUserCount().subscribe(
      (users: any) => {
        if (users.status) {
          this.totalLoggedInUser = users.count;
        }
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }

  // total  varified user
  varifiedUserCount() {
    this.apiService.varifiedUserCount().subscribe(
      (res: any) => {
        if (res.status) {
          this.totalVarifiedUser = res.count;
        }
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }
  // total  Admin count
  totalAdminCount() {
    this.apiService.toatalAdminCount().subscribe(
      (res: any) => {
        if (res.status) {
          this.totalAdmin = res.count;
        }
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }
  // total  Admin Logged In count
  allLoggedAdminCount() {
    this.apiService.allLoggedAdminCount().subscribe(
      (res: any) => {
        if (res.status) {
          this.totalAdminActive = res.count;
        }
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }
}
