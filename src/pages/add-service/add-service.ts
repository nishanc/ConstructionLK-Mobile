import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,    
    private http: Http,
    public storage: Storage,
    private alertCtrl: AlertController) {
    this.getSubCatagories();
    this.storage.get('StoredID').then((val) => {
      this.Id = val;
    });
  }

  logForm() {
    this.ServiceData = this.FrmAddNewService;
    this.ServiceData.UserId = this.Id;
    this.ServiceData.TypeId = 2;
    console.log(this.ServiceData);
    var headers = new Headers();
    headers.append("Accept", 'application/json');

    let options = new RequestOptions({ headers: headers });    
   
    let postParams =  this.ServiceData;    
    this.http.post('http://constructionlkapi.azurewebsites.net/ItemService/AddNewService', postParams, options)
      .subscribe(data => {
        alert("Service Added");
        
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: error._body,
          buttons: ['OK']
        });
        alert.present();
        console.log(error);
      })
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
      })

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
