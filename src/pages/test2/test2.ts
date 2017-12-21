import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  map: GoogleMap;
  todo = {};
  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    public navParams: NavParams,
    public http: Http,
    private diagnostic: Diagnostic,
    public platform: Platform,
    private googleMaps: GoogleMaps) {
    //this.checkLocation();

  }
  newser(){
    this.navCtrl.push(AddServicePage);
  }
  chart(){
    this.navCtrl.push(ProgressReviewPage);
  }
  logForm() {
    console.log(this.todo)
  }
  ionViewDidLoad() {
    this.loadMap();
   }
 
  loadMap() {
    let element : HTMLElement = document.getElementById('map');
    let map : GoogleMap = this.googleMaps.create(element);
     let mapOptions: GoogleMapOptions = {
       camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
     };
 
     this.map = this.googleMaps.create('map_canvas', mapOptions);
 
     // Wait the MAP_READY before using any methods.
     this.map.one(GoogleMapsEvent.MAP_READY)
       .then(() => {
         console.log('Map is ready!');
 
         // Now you can use all methods safely.
         this.map.addMarker({
             title: 'Ionic',
             icon: 'blue',
             animation: 'DROP',
             position: {
               lat: 43.0741904,
               lng: -89.3809802
             }
           })
           .then(marker => {
             marker.on(GoogleMapsEvent.MARKER_CLICK)
               .subscribe(() => {
                 alert('clicked');
               });
           });
 
       });
   }
  checkLocation() {
    this.platform.ready().then((readySource) => {

      this.diagnostic.isLocationEnabled().then(
        (isAvailable) => {
          console.log('Is available? ' + isAvailable);
          alert('Is available? ' + isAvailable);
        }).catch((e) => {
          console.log(e);
          alert(JSON.stringify(e));
        });


    });
  }
  // getGeo() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     // resp.coords.latitude
  //     // resp.coords.longitude
  //     console.log(resp);
  //     alert(JSON.stringify(resp));
  //   }).catch((error) => {
  //     alert('Error getting location' + JSON.stringify(error));
  //   });
  // }

  
}
