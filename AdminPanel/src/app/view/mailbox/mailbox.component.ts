import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {
  constructor(
    private router: Router,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) {}

  ngOnInit() {
    // this.loadScripts();
  }

  // private loadScripts() {

  //   this.dynamicScriptLoader.load('main', 'mainjQ').then(data => {

  //     console.log('FAIL');
  //   }).catch(error => console.log(error));
  // }
}
