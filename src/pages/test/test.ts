
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { identifierModuleUrl } from '@angular/compiler/compiler';
import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController, AlertController, App,  Platform, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;
declare var MarkerClusterer: any;
@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
@ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;

  listSearch: string = '';

  map: any;
  marker: any;
  loading: any;
  search: boolean = false;
  error: any;
  switch: string = "map";
  myPos : any;
  regionals: any = [];
  currentregional: any;
  public lat :number;
  public lng:number;
  private autharization : any;
  private token : any;
  constructor(
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public app: App,
    private http: Http,
    public nav: NavController,
    public zone: NgZone,
    public platform: Platform,
    public alertCtrl: AlertController,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public geolocation: Geolocation
  ) {
    this.platform.ready().then(() => this.loadMaps());
    this.regionals = [{
      "title": "Marker 1",
      "latitude": 52.50094,
      "longitude": 13.29922,
    }, {
      "title": "Marker 3",
      "latitude": 52.50010,
      "longitude": 13.29922,
    }, {
      "title": "Marker 2",
      "latitude": 49.1028606,
      "longitude": 9.8426116
    }];
  }
  pushToPayments(){
    let requestData={
      Location :{Lat : this.lat, Lon : this.lng},
      ItemId : this.navParams.get('id'),
      Message : "Please accept"
    }
    console.log(requestData);
    this.storage.get('StoredToken').then((token) => {
      this.token = token;
                
    });
    this.autharization = 'Bearer '+this.token; 
    var headers = new Headers();
    headers.append('Authorization',this.autharization);
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });       
    
    this.http.post('http://constructionlkapi.azurewebsites.net/Request/NewRequest', requestData, options)
      .subscribe(data => {
        console.log("Success");        
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: error._body,
          buttons: ['OK']
        });
        alert.present();
        console.log(error);
      });
  }
  
  viewPlace(id) {
    console.log('Clicked Marker', id);
  }


  loadMaps() {
    if (!!google) {
      this.initializeMap();
      this.initAutocomplete();
    } else {
      this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.')
    }
  }

  errorAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.loadMaps();
          }
        }
      ]
    });
    alert.present();
  }

  mapsSearchBar(ev: any) {
    // set input to the value of the searchbar
    //this.search = ev.target.value;
    console.log(ev);
    const autocomplete = new google.maps.places.Autocomplete(ev);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          sub.next(place.geometry.location);
          sub.complete();
        }
      });
    });
  }

  initAutocomplete(): void {
  
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {
      console.log('Searchdata', location);

      let options = {
        center: location,
        zoom: 10
      };
      this.map.setOptions(options);
      this.addMarker(location, "Mein gesuchter Standort");

    });
  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          console.log(this.lat+"   "+this.lng);
          // console.log('Search Lat', place.geometry.location.lat());
          // console.log('Search Lng', place.geometry.location.lng());
          sub.next(place.geometry.location);
          //sub.complete();
        }
      });
    });
  }

  initializeMap() {
    this.zone.run(() => {
      var mapEle = this.mapElement.nativeElement;
      this.map = new google.maps.Map(mapEle, {
        zoom: 10,
        center: { lat: 51.165691, lng: 10.451526 },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
        disableDoubleClickZoom: false,
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
      });

      let markers = [];
      for (let regional of this.regionals) {
        regional.distance = 0;
        regional.visible = false;
        regional.current = false;

        let markerData = {
          position: {
            lat: regional.latitude,
            lng: regional.longitude
          },
          map: this.map,
          title: regional.title,
        };

        regional.marker = new google.maps.Marker(markerData);
        markers.push(regional.marker);

        regional.marker.addListener('click', () => {
          for (let c of this.regionals) {
            c.current = false;
            //c.infoWindow.close();
          }
          this.currentregional = regional;
          regional.current = true;

          //regional.infoWindow.open(this.map, regional.marker);
          this.map.panTo(regional.marker.getPosition());
        });
      }

      new MarkerClusterer(this.map, markers, {
        styles: [
          {
            height: 53,
            url: "assets/img/MapMarkerJS.png",
            width: 53,
            textColor: '#fff'
          },
          {
            height: 56,
            url: "assets/img/MapMarkerJS.png",
            width: 56,
            textColor: '#fff'
          },
          {
            height: 66,
            url: "assets/img/MapMarkerJS.png",
            width: 66,
            textColor: '#fff'
          },
          {
            height: 78,
            url: "assets/img/MapMarkerJS.png",
            width: 78,
            textColor: '#fff'
          },
          {
            height: 90,
            url: "assets/img/MapMarkerJS.png",
            width: 90,
            textColor: '#fff'
          }
        ]
      });




      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        google.maps.event.trigger(this.map, 'resize');
        mapEle.classList.add('show-map');
        this.bounceMap(markers);
       
      });

      google.maps.event.addListener(this.map, 'bounds_changed', () => {
        this.zone.run(() => {
          this.resizeMap();
        });
      });


    });
  }

  //Center zoom

  bounceMap(markers) {
    let bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }

    this.map.fitBounds(bounds);
  }

  resizeMap() {
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 200);
  }

 

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  choosePosition() {
    this.getCurrentPosition();
  }

  // go show currrent location
  getCurrentPosition() {
    this.loading = this.loadingCtrl.create({
      content: 'Searching Location ...'
    });
    this.loading.present();

    let locationOptions = { timeout: 10000, enableHighAccuracy: true };

    this.geolocation.getCurrentPosition(locationOptions).then(
      (position) => {
        this.loading.dismiss().then(() => {

          this.showToast('Location found!');

          console.log(position.coords.latitude, position.coords.longitude);
          this.myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          let options = {
            center: this.myPos,
            zoom: 14
          };
          this.map.setOptions(options);
          this.addMarker(this.myPos, "Mein Standort!");

          let alert = this.alertCtrl.create({
            title: 'Location',
            message: 'Do you want to get current location as the location that the service is needed?',
            buttons: [
              {
                text: 'Cancel'
              },
              {
                text: 'Yes',
                handler: data => {
                  this.lat = position.coords.latitude;
                  this.lng = position.coords.longitude;
                  console.log("My loc: "+this.myPos);
                  console.log(this.lat+"   "+this.lng);
                  
                }
              }
            ]
          });
          alert.present();
          

        });
      },
      (error) => {
        this.loading.dismiss().then(() => {
          this.showToast('Location not found. Please enable your GPS!');

          console.log(error);
        });
      }
    )
  }

  toggleSearch() {
    if (this.search) {
      this.search = false;
    } else {
      this.search = true;
    }
  }

  addMarker(position, content) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position
    });

    this.addInfoWindow(marker, content);
    return marker;
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

}
