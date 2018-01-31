import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
import { ProgressReviewPage } from '../progress-review/progress-review';
import { AddServicePage } from '../add-service/add-service';
 
 
@IonicPage()
@Component({
  selector: 'page-test2',
  templateUrl: 'test2.html',
})
export class Test2Page {
  pic: any;
  getURL: string;
  
  constructor(public navCtrl: NavController,
    public http: Http,
    public navParams: NavParams,
    public loadingController: LoadingController,
    private diagnostic: Diagnostic,
    ) {
    
  }
  
  
  
}
