import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { ToastrService } from 'ngx-toastr';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';

declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  TwoFactorForm: FormGroup;
  TwoFactorDisableForm: FormGroup;
  checkEnable: boolean;
  public qrcode: any;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) {}

  ngOnInit() {
    this.TwoFactorForm = this.formBuilder.group({
      OtpField: ['', [Validators.required]]
    });
    this.TwoFactorDisableForm = this.formBuilder.group({
      OtpToDisable: ['', [Validators.required]]
    });
    const retrievedData = JSON.parse(localStorage.getItem('currentUser'));
    this.checkEnable = retrievedData['user']['twofaEnable'];
  }
  // You can load multiple scripts by just providing the key as argument into load method of the service
  loadScripts() {
    this.dynamicScriptLoader
      .load('mainjQ', 'jQui', 'bsBundle', 'icons', 'perfectScroll', 'main')
      .then(data => {})
      .catch(error => console.log(error));
  }
  // Fucntion to enable Two factor Authentication
  enable2Fa() {
    const retrievedData = JSON.parse(localStorage.getItem('currentUser'));
    const userID = retrievedData['user']['_id'];
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You wont be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Proceed it!'
      })
      .then(result => {
        if (result.value) {
          this.apiService.enable2fa().subscribe(
            (res: any) => {
              this.qrcode = res.qr;

              $('#TwoFactorModal').modal('toggle');
            },
            error => {
              this.toastr.error(error.message);
            }
          );
        }
      });
  }

  // Confirmation Fucntion to enable Two factor Authentication
  Confirm2factorAuth() {
    const data: any = this.TwoFactorForm.value;
    this.apiService.Confirm2factorAuth(data.OtpField).subscribe(
      (res: any) => {
        if (res.status) {
          const retrievedData = JSON.parse(localStorage.getItem('currentUser'));
          retrievedData['user']['twofaEnable'] = true;
          localStorage.setItem('currentUser', JSON.stringify(retrievedData));
          $('#TwoFactorModal').modal('hide');
          this.checkEnable = true;
          this.toastr.success('Two factor Authentication Enabled');
        } else {
        }
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }
  // Fucntion to disable Two factor Authentication
  disable2Fa() {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You wont be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Proceed it!'
      })
      .then(result => {
        if (result.value) {
          $('#TwoFactorModaltodiable').modal('toggle');
        }
      });
  }
  // Confirmation Fucntion to disable Two factor Authentication
  Confirm2disable2Fa() {
    const data: any = this.TwoFactorDisableForm.value;
    const retrievedData = JSON.parse(localStorage.getItem('currentUser'));
    const userID = retrievedData['user']['_id'];
    this.apiService.Confirm2disable2Fa(data.OtpToDisable, userID).subscribe(
      (res: any) => {
        if (res.status) {
          const Dataretrieved = JSON.parse(localStorage.getItem('currentUser'));
          Dataretrieved['user']['twofaEnable'] = false;
          localStorage.setItem('currentUser', JSON.stringify(Dataretrieved));
          this.checkEnable = false;
          $('#TwoFactorModaltodiable').modal('hide');
          this.toastr.success('Two factor Authentication Disabled');
        } else {
        }
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }
}
