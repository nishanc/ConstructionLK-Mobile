import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';

/**
 * Generated class for the MapDirctionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-map-dirctions',
  templateUrl: 'map-dirctions.html',
})
export class MapDirctionsPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start :any;
  end :any;
  lng : number;
  lat: number;
  myLocation:any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController,
       public navParams: NavParams,
       private geolocation: Geolocation) {
   
        
    this.start = new google.maps.LatLng(this.lat, this.lng);
    this.end = new google.maps.LatLng(6.831542, 79.874404);
    this.getRoute();
  }
  getMyLocation(){
    let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
          
          this.lng = data.coords.latitude;
          this.lat = data.coords.longitude;
          this.myLocation = new LatLng(this.lat, this.lng);
          return this.myLocation;
        
         
    });
  }
  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });

    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  getRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  

 
}
