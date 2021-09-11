import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {
  userList: any;
  userRole: any;
  items = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private apiService: ApiService,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) {}

  ngOnInit() {
    this.loadScripts();
    this.getAllUsers();
  }
  // You can load multiple scripts by just providing the key as argument into load method of the service
  private loadScripts() {
    this.dynamicScriptLoader
      .load('mainjQ', 'jQui', 'bsBundle', 'icons', 'perfectScroll', 'main')
      .then(data => {
        // Script Loaded Successfully
      })
      .catch(error => console.log(error));
  }

  // get user list
  getAllUsers() {
    this.userList = [];
    this.apiService.getAllusers().subscribe(
      (users: any) => {
        if (users.status) {
          this.userList = users['userList'];
          // this.items = users['userList'];
          const lenght = users['pagination'].total;
          const limit = users['pagination'].limit;
          const page = Math.ceil(lenght / limit);

          for (let i = 1; i <= page; i++) {
            this.items.push(i);
          }
        } else {
          this.toastr.error(users.message);
        }
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }
  // update current page of items
  onChangePage(userList: any) {
    this.userList = userList;
  }
  // change user role
  changeRole(role: any) {
    this.userRole = role;
    $('#myModal').modal('toggle');
  }
  // confirmation for user role change
  confirmRole(role: any) {
    this.apiService.changeuserstatus(role).subscribe(
      (res: any) => {
        this.getAllUsers();
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }
  // delete user
  deleteUser(Userid: any) {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You wont be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then(result => {
        if (result.value) {
          {
            this.apiService.deleteUser(Userid).subscribe(
              (res: any) => {
                this.getAllUsers();
                console.log('Delete User', res);
                swal.fire('Deleted!', 'User has been deleted.', 'success');
              },
              error => {
                this.toastr.error(error.message);
              }
            );
          }
        }
      });
  }

  // get user serchlist
  searchUsers(username: any) {
    this.userList = [];
    this.apiService.searchUsers(username).subscribe(
      (users: any) => {
        if (users.status) {
          this.userList = users['message'];

          //   const lenght = users['pagination'].total;
          //   const limit = users['pagination'].limit;
          //   const page = Math.ceil(lenght / limit);

          //   for (let i = 1; i <= page; i++) {
          //     this.items.push(i);
          //   }
        } else {
          this.toastr.error(users.message);
        }
      },
      error => {
        this.toastr.error(error.message);
      }
    );
  }
}
