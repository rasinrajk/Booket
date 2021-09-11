import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';
import swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {
  adminList: any;
  userRole: any;
  items = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiService,
    private toastr: ToastrService,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) {}

  ngOnInit() {
    this.loadScripts();
    this.listallAdmin();
  }
  // You can load multiple scripts by just providing the key as argument into load method of the service
  loadScripts() {
    this.dynamicScriptLoader
      .load('mainjQ', 'jQui', 'bsBundle', 'icons', 'perfectScroll', 'main')
      .then(data => {})
      .catch(error => console.log(error));
  }
  // get all admin list
  listallAdmin() {
    this.adminList = [];
    this.apiService.listallAdmin().subscribe(
      (alladmin: any) => {
        if (alladmin.status) {
          this.adminList = alladmin['adminList'];

          this.items = this.adminList;
          // this.adminList = alladmin.data;
        } else {
          this.toastr.error(alladmin.message);
        }
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }
  // update current page of items
  onChangePage(adminList: Array<any>) {
    this.adminList = adminList;
  }
  // change role
  changerole(role: any) {
    this.userRole = role;
    $('#myModal').modal('toggle');
  }
  // confirmation for role change
  cofirmRole(role: any) {
    this.apiService.changeuserstatus(role).subscribe(
      (data: any) => {
        this.listallAdmin();
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }
  // function to delete admin
  deleteAdmin(Adminid: any) {
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
            this.apiService.deleteAdmin(Adminid).subscribe(
              (res: any) => {
                this.listallAdmin();

                swal.fire('Deleted!', 'Admin has been deleted.', 'success');
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
  searchAdmin(username: any) {
    this.adminList = [];
    this.apiService.searchAdmin(username).subscribe(
      (users: any) => {
        if (users.status) {
          this.adminList = users['message'];

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
