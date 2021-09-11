import { Component, AfterViewInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AutoLogoutService } from 'src/app/services/autologout.service';
import { DynamicScriptLoaderService } from 'src/app/services/dynamic-script-loader.service';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'adminPanel';
  constructor(
    private service: AutoLogoutService,
    private scriptloader: DynamicScriptLoaderService
  ) {}
  ngAfterViewInit() {
    Feather.replace();
  }
}
