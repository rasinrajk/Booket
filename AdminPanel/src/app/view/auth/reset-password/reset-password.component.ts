import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { ApiService } from 'src/app/services/api.service';
import { MustMatch } from '../../../utils/must-match-validator';
import { DynamicScriptLoaderService } from '../../../services/dynamic-script-loader.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  activate: string;
  resetForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) {
    this.route.queryParams.subscribe(params => {
      this.activate = params['token'];
    });
  }

  ngOnInit() {
    this.resetForm = this.formBuilder.group(
      {
        password: [
          '',
          [Validators.required, ValidationService.passwordValidator]
        ],
        confirm_password: [
          '',
          [Validators.required, ValidationService.passwordValidator]
        ]
      },
      {
        validator: MustMatch('password', 'confirm_password')
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
  // Reset Password Function
  doReset() {
    const data: any = this.resetForm.value;
    this.apiService.doReset(data, this.activate).subscribe(
      (res: any) => {
        this.router.navigate(['login']);
        this.toastr.success('Password Updated');
      },
      error => {
        this.toastr.error(error.error.message);
      }
    );
  }
}
