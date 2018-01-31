import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ConstructorProfilePage } from '../constructor-profile/constructor-profile';

@IonicPage()
@Component({
  selector: 'page-add-service',
  templateUrl: 'add-service.html',
})
export class AddServicePage {
  
  private supCatagory: any;
  private subCatagory: any;
  private FrmAddNewService = {};
  private supCat: any;
  private subCat: any;
  private Id : any;
  private ServiceData : any;
  private locationData :any; 
  private geometryData :any; 
  private servicelocation : any;
  private town : string;
  private latLangURL : string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,    
    private http: Http,
    public toastCtrl: ToastController,
    public storage: Storage,
    private alertCtrl: AlertController) {
    this.getSubCatagories();
    this.storage.get('StoredID').then((val) => {
      this.Id = val;
    });
  }
  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
  logForm() {
    this.ServiceData = this.FrmAddNewService;
    this.ServiceData.UserId = this.Id;
    this.ServiceData.TypeId = 2;    

    this.latLangURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+this.ServiceData.location+'&key=AIzaSyDqi5hLC3fY6cJGz60uh30IeKhIGA0czpI';
    console.log(this.latLangURL);
    this.http.get( this.latLangURL).map(res => res.json())
    .subscribe(data => {
      this.locationData = data;  
      console.log('data '+data);    
      console.log(this.locationData.results[0]);
      this.geometryData = this.locationData.results[0];
      console.log(this.geometryData.geometry.location);
      console.log(this.geometryData.formatted_address);
      let alert = this.alertCtrl.create({
        title: 'Get location as..',
        subTitle: this.geometryData.formatted_address,
        buttons: [
              {
                text: 'OK',
                handler: () => {
                  console.log(this.ServiceData);
                  this.servicelocation = this.geometryData.geometry.location;
                  console.log(this.servicelocation);
                  this.ServiceData.location = this.servicelocation; 
                  
                  var headers = new Headers();
                  headers.append("Accept", 'application/json');
                  let options = new RequestOptions({ headers: headers });
                  delete this.ServiceData.txtsupCatagory;       
                  let postParams =  this.ServiceData;  
                  console.log(postParams);
                  console.log("Service data :" + this.ServiceData);
                  this.http.post('http://constructionlkapi.azurewebsites.net/ItemService/AddNewService2', postParams, options)
                    .subscribe(data => {                      
                      this.showToast('Service Added!');
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
              }             
            ]
      });
     
      alert.present();
    }, error => {
      alert(error);
    });

    
  }

  getSubCatagories() {
    var headers = new Headers();
    //headers.append('Authorization',this.autharization);
    headers.append('Accept', 'application/json');
    this.http.get('http://constructionlkapi.azurewebsites.net/ItemService/GetCategories', { headers: headers }).map(res => res.json())
      .subscribe(data => {
        this.supCatagory = data;
      }, error => {
        console.log(error);
    });

  }
  onChange(index: any) {
    this.subCat = this.supCatagory[index - 1];
    this.subCatagory = this.subCat.SubCategories;
    console.log(this.subCatagory);
  }
 
  selectItemCode() {
    console.log('Clicked');
  }
  
}
