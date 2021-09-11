import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  constructor(
    private router: Router,
    // private dynamicScriptLoader: DynamicScriptLoaderService,
  ) { }

  ngOnInit() {
    // this.loadScripts();
  }
  // private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    // this.dynamicScriptLoader.load('main', 'mainjQ', 'jQui', 'icons', 'moment', 'calendar', 'calendarEvents', 'fullcalendar').then(data => {
      // Script Loaded Successfully   'perfectScroll', 'bsBundle',
      // console.log('FAIL');
    // }).catch(error => console.log(error));
  // }

}
