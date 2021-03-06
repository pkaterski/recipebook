import { Component, OnInit } from '@angular/core';
import { ConfigService } from './shared/config.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private configService: ConfigService) {}

  ngOnInit() {
    // this.configService.fetchData();

    firebase.initializeApp({
      apiKey: "AIzaSyAgZbMVA7ZFw7dD8zmaVCvpwzPXWij40mI",
      authDomain: "udemy-recipe-project-db.firebaseapp.com",
    });
  }
}

// greek question mark ;
