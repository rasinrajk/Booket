import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userName: any;
  public userMail: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const retrievedData = JSON.parse(localStorage.getItem('currentUser'));
    this.userMail = retrievedData.user.email;
    this.userName = retrievedData.user.name;
  }

  // Function Logout
  dologout() {
    this.apiService.logout().subscribe(
      (res: any) => {
        if (res) {
          this.router.navigate(['login']);
          this.toastr.error('User Logged Out');
          localStorage.removeItem('currentUser');
          localStorage.removeItem('UserToken');
          localStorage.removeItem('currentUserID');
        } else {
        }
      },
      error => {
        this.toastr.error(error.message);
      }
    );
  }
}
