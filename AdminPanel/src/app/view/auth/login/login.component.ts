import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { DynamicScriptLoaderService } from '../../../services/dynamic-script-loader.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  activate: string;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) {
    this.route.queryParams.subscribe(params => {
      this.activate = params['status'];
      if (this.activate !== undefined && this.activate === '1') {
        this.toastr.success(
          'Your account has been activated successfully. You can now login'
        );
      } else if (this.activate !== undefined && this.activate === '1') {
      }
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]]
    });
    this.loadScripts();
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

  // Function to login
  doLogin() {
    const data: any = this.loginForm.value;
    this.apiService.doLogin(data).subscribe(
      (res: any) => {
        if (res.user['twofaEnable'] && res.status) {
          this.router.navigate(['enterOTP']);
        }
        if (res.user['twofaEnable'] === false && res.status === true) {
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
