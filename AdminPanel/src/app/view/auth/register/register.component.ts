import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ValidationService } from 'src/app/services/validation.service';
import { MustMatch } from '../../../utils/must-match-validator';
import { ToastrService } from 'ngx-toastr';
import { DynamicScriptLoaderService } from '../../../services/dynamic-script-loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        first_name: [
          '',
          [Validators.required, ValidationService.textOnlyValidator]
        ],

        email: ['', [Validators.required, ValidationService.emailValidator]],
        password: [
          '',
          [Validators.required, ValidationService.passwordValidator]
        ],
        confirmpassword: [
          '',
          [Validators.required, ValidationService.passwordValidator]
        ]
      },
      {
        validator: MustMatch('password', 'confirmpassword')
      }
    );
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
  // Creter user function
  createUserAccount() {
    const data: any = this.registerForm.value;
    this.apiService.doSignup(data).subscribe(
      (result: any) => {
        this.router.navigate(['dashboard']);
        this.toastr.success('confirmation mail has been send.');
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }
}
