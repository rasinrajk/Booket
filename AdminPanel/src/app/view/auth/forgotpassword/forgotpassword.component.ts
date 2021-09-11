import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { DynamicScriptLoaderService } from '../../../services/dynamic-script-loader.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  message = null;
  messageType = null;
  forgotPasswordForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) {}

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]]
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
  // forgot password method
  forgotPassword() {
    const data: any = this.forgotPasswordForm.value.email;
    this.apiService.forgotPassword(data).subscribe(
      (res: any) => {
        if (res.status !== false) {
          swal
            .fire({
              title: 'Passsword Reset Link Has Been Sent',
              text: 'Please check your email',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'ok'
            })
            .then(result => {
              this.router.navigate(['/login']);
            });
        } else {
          this.toastr.error(res.message);
        }
      },
      error => {
        console.log(error);
        this.toastr.error(error.error.message);
      }
    );
  }
}
