import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { PickLocationPage } from '../pick-location/pick-location';
import { EditServicePage } from '../edit-service/edit-service';

declare var google;

@IonicPage()
@Component({
  selector: 'page-service-details',
  templateUrl: 'service-details.html',
})
export class ServiceDetailsPage {
  latLan: any;
  geometryData: any;
  locationData: any;
  properties: any;
  @ViewChild('demo') demo: ElementRef;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  private serviceLocation: any;
  private serviceLocations: any;
  private getURL: string;
  private autharization: any;
  private serviceDetails: any;
  private serviceId: string;
  public propertiesArray: Array<any>;
  public locationArray: Array<any>;  
  private latLangURL : string;
  constructor(
    public navCtrl: NavController,   
    public navParams: NavParams,
    public loadingController: LoadingController,
    public http: Http,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  ) {
    this.serviceId = this.navParams.get('id');
    console.log(this.serviceId);
    this.getServiceDetails();
    
  }
  
  pricingPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Pricing',
      message: 'You can change the price details of your service from here. Pricing basis means how you are going to price your service. Eg: Hourly rate, Price for Sq m ',
      inputs: [
        {
          name: 'txtBasis',
          placeholder: 'Pricing Basis'
          
        },
        {
          name: 'txtPrice',
          placeholder: 'Price',
          //type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            
            this.updatePricing(data.txtPrice,data.txtBasis);
          }
        }
      ]
    });
    alert.present();
  }
  public updatePricing(price:number,basis:string):void{
  
    this.propertiesArray =  [
      { Property : basis,
        Value : price },
    ];
    let updateData = {
      ItemId: this.serviceId,
      Properties:  this.propertiesArray      
    }
    console.log(updateData);    
    var headers = new Headers();    
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://constructionlkapi.azurewebsites.net/ItemService/UpdateItemProperty', updateData, options)
      .subscribe(data => {
        this.showToast("Successfully Updated!");  
        this.getServiceDetails();  
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
  locationPrompt() {
    var data = this.serviceId;
    this.navCtrl.push(PickLocationPage,{data:data});
  }
  ionViewDidLoad(){
    this.initMap();
  }
  public initMap() : void {
    
    let latLng = new google.maps.LatLng(6.927079,79.861244);
    
       let mapOptions = {
         center: latLng,
         zoom: 8,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }
    
       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  private createMapMarker(place: any): void {
    console.log("Marked");
    var marker = new google.maps.Marker({
      map: this.map,
      position: place,
      animation: google.maps.Animation.DROP,
      title: 'Service location',
      icon: "./assets/img/pin.png"
    });
    this.markers.push(marker);
  }

  getServiceDetails() {
    let loading = this.loadingController.create({ content: "Loading..." });
    loading.present();
    this.getURL = 'http://constructionlkapi.azurewebsites.net/ItemService/GetServiceDetail?Id=' + this.serviceId;
    this.http.get(this.getURL).map(res => res.json())
      .subscribe(data => {
        loading.dismissAll();
        console.log(data);        
        this.serviceDetails = data;
        this.properties = this.serviceDetails.properties;
        console.log(this.serviceDetails);
        this.serviceLocations = this.serviceDetails.Locations;
        console.log(this.serviceLocations);
        //this.initMap();
        for(var key in this.serviceLocations){
          this.serviceLocation = this.serviceLocations[key];
          delete this.serviceLocation.Id; 
          this.serviceLocation.lat = this.serviceLocation.Lat;
          this.serviceLocation.lng = this.serviceLocation.Lon;
          delete this.serviceLocation.Lon;
          delete this.serviceLocation.Lat;
          console.log(this.serviceLocation);
          this.createMapMarker(this.serviceLocation);
        }
      }, error => {
        console.log(error);
      })

      // var text = "";
      // var i;
      // for (i = 0; i < 5; i++) {
      //     text += "<img src= 'http://www.moviesmacktalk.com/news/wp-content/uploads/2013/11/1-star.jpg' alt='Girl in a jacket' width='30' height='30'>";
      // }
      // this.demo.nativeElement = 'text';
      
  }
  updateSerivce(){
    this.navCtrl.push(EditServicePage); 
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
