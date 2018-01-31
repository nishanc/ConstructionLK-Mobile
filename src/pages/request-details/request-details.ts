import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { CallNumber } from '@ionic-native/call-number';
import { ConstructorProfilePage } from '../constructor-profile/constructor-profile';
declare var google;

@IonicPage()
@Component({
  selector: 'page-request-details',
  templateUrl: 'request-details.html',
})

export class RequestDetailsPage  {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  private serviceLocation: any;
  private requestData: any;
  private getURL: string;
  private serviceId: any;
  private dateTime : any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public http: Http,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private callNumber: CallNumber) {

    this.requestData = this.navParams.get('data');
    
    this.dateTime = {
      date : this.requestData.Time.substring(0, 10),
      time : this.requestData.Time.substring(11, 16)
    };
   
    this.createLocationData();
  }
  public createLocationData(): void {
    
    this.serviceLocation = this.requestData.Location;
    console.log(this.serviceLocation);
    delete this.serviceLocation.Id;
    this.serviceLocation.lat = this.serviceLocation.Lat;
    this.serviceLocation.lng = this.serviceLocation.Lon;
    delete this.serviceLocation.Lon;
    delete this.serviceLocation.Lat;
    console.log(this.serviceLocation);
    
    
  }
  ionViewDidLoad(){
    this.initMap();
  }
  public initMap(): void {
    
    let latLng = this.serviceLocation;
    
       let mapOptions = {
         center: latLng,
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }
    
       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.createMapMarker(latLng);
  }
  private createMapMarker(point : any): void {
    
    var marker = new google.maps.Marker({
      map: this.map,
      position: point,
      animation: google.maps.Animation.DROP,
      title: 'Service location',
      icon: "./assets/img/pin.png"
    });
    this.markers.push(marker);
  }
  private callCustomer(): void {
    this.callNumber.callNumber(this.requestData.Phone, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }
  requestResponse(reponse: boolean) {
    let reponseData = {
      Accept: reponse,
      reqId: this.requestData.JobId
    }
    console.log(reponseData);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.http.post('http://constructionlkapi.azurewebsites.net/ServiceProvider/ResponseRequest', reponseData, options)
      .subscribe(data => {
        if (reponse == true)
          this.showToast("Request Accepted!");
        else
          this.showToast("Request Denaied!");

        this.navCtrl.push(ConstructorProfilePage);
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
  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }

}
