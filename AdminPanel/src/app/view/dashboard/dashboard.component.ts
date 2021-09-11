import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';
import { ApiService } from 'src/app/services/api.service';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private dynamicScriptLoader: DynamicScriptLoaderService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    Feather.replace();
    this.loadScripts();
  }

  loadScripts() {
    this.dynamicScriptLoader
      .load(
        'mainjQ',
        'jQui',
        'bsBundle',
        'icons',
        'perfectScroll',
        'main',
        'cookie'
      )
      .then(data => {
        console.log('FAIL');
      })
      .catch(error => console.log(error));
  }
}
