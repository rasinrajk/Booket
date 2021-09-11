import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public userRole: any;
  constructor() {}

  ngOnInit() {
    Feather.replace();
    const retrievedData = JSON.parse(localStorage.getItem('currentUser'));
    this.userRole = retrievedData['user']['role'];
    $('.nav-sidebar .with-sub').on('click', function(e) {
      e.preventDefault();

      $(this)
        .parent()
        .toggleClass('show');
      $(this)
        .parent()
        .siblings()
        .removeClass('show');
    });

    $('.burger-menu:first-child').on('click', (e: any) => {
      e.preventDefault();
      $('body').toggleClass('toggle-sidebar');
    });
  }
}
