import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, App } from 'ionic-angular';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { ProgressUpdatePage } from '../progress-update/progress-update';
import { ConstructorProfilePage } from '../constructor-profile/constructor-profile';

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
  private map: any;
  private start: any;
  private end: any;
  private lng: number;
  private lat: number;
  private myLocation: any;
  private directionsService = new google.maps.DirectionsService;
  private directionsDisplay = new google.maps.DirectionsRenderer;
  private ServiceLocation: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public viewCtrl: ViewController,
    private geolocation: Geolocation,
    public platform: Platform, ) {
   
    this.ServiceLocation = this.navParams.get('data');
    this.end = new LatLng(this.ServiceLocation.Lat, this.ServiceLocation.Lon);
  }
  //_______________________Dirctions____________
  getRoute() {
    
    this.directionsService.route({
      origin: this.myLocation,
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
  getmyLocation() {

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      let location = new LatLng(data.coords.latitude, data.coords.longitude);
      this.myLocation = location;
      if (this.myLocation != null)
        this.getRoute();
    });
  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: { lat: 6.78807068, lng: 79.89128 }
    });

    this.directionsDisplay.setMap(this.map);
    this.getMyLocation();
  }

  
  getMyLocation() {

    let watch = this.geolocation.getCurrentPosition().
      then((data) => {
        let location = new LatLng(data.coords.latitude, data.coords.longitude);
        this.myLocation = location;
        if (this.myLocation != null)
          this.getRoute();
      });

  }
  closeModal() {
    this.viewCtrl.dismiss().then(() => {
      this.app.getRootNav().push(ConstructorProfilePage);
    });
  }


}
