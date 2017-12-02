import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
/**
 * Generated class for the UserMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-map',
  templateUrl: 'user-map.html',
})
export class UserMapPage {
  map: any;
  @ViewChild('map') mapElement;
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {    
    this.initMap();
  }
  initMap() {
  // let latLng = new google.maps.LatLng(6.7969, 79.9018);
  //   let mapOption = {
  //     center: latLng,
  //     zoom: 15,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };
  //   var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  //   var marker = new google.maps.Marker({
  //     position: latLng,
  //     map: this.map,
  //     icon: image
  //   });
  this.geolocation.getCurrentPosition().then((position) => {
    
    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    console.log(position);
    let mapOptions = {
           center: latLng,
           zoom: 15,
           mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  },(err)=>{
    console.log(err);
  });

}
  getGeoLocation() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    let content = "<h4>Information!</h4>";         
   
    this.addInfoWindow(marker, content);
  }
  addInfoWindow(marker, content){
    
     let infoWindow = new google.maps.InfoWindow({
       content: content
     });
    
     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
     });
    
   }
}
