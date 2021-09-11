import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';
declare var $: any;
@Component({
  selector: 'app-secure-otp',
  templateUrl: './secure-otp.component.html',
  styleUrls: ['./secure-otp.component.css']
})
export class SecureOTPComponent implements OnInit {
  twofatctorLoginForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) {}

  ngOnInit() {
    this.twofatctorLoginForm = this.formBuilder.group({
      userotp: ['', [Validators.required]]
    });
  }
  // You can load multiple scripts by just providing the key as argument into load method of the service
  loadScripts() {
    this.dynamicScriptLoader
      .load('main', 'mainjQ', 'jQui', 'icons', 'perfectScroll', 'bsBundle')
      .then(data => {})
      .catch(error => console.log(error));
  }
  // Funtion to login using OTP
  loginwithOTP() {
    const data: any = this.twofatctorLoginForm.value;

    this.apiService.loginwithOTP(data.userotp).subscribe(
      (res: any) => {
        if (res.status) {
          const token = res['user']['tokens'];
          localStorage.setItem('currentUser', JSON.stringify(res));
          localStorage.setItem(
            'UserToken',
            JSON.stringify(token[token.length - 1].token).slice(1, -1)
          );
          localStorage.setItem(
            'currentUserID',
            JSON.stringify(res['user']['_id'])
          );
          this.router.navigate(['dashboard']);
          this.toastr.success('Login Successfull');
        } else {
        }
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }
}
