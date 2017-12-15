import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { MapDirctionsPage } from '../map-dirctions/map-dirctions';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-user-map',
  templateUrl: 'user-map.html',
})
export class UserMapPage {
  lng: any;
  lat: any;
  map: any;
  myLocation:any;
  @ViewChild('map') mapElement: ElementRef;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private platform: Platform
  ) {
    platform.ready().then(() => {
      this.loadMap();
      //this.getCurrentPosition()
    });
  }


  loadMap() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.lng = data.coords.latitude;
      this.lat = data.coords.longitude;
      this.myLocation = new LatLng(this.lat, this.lng);
     // alert(location);
      this.map = new GoogleMap('map', {

        'controls': {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        },
        'camera': {
          'tilt': 30,
          'zoom': 15,
          'bearing': 50
        }
      });

      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');
      });
    });
  }
  getMyLocation() {    
    alert(this.lat+""+ this.lng);
    this.navCtrl.push(MapDirctionsPage,{ lat : this.lat, lng : this.lng});
  }
}


