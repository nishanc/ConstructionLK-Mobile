import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { ProvidersearchResultsProvider } from '../../providers/providersearch-results/providersearch-results';
import { SearchResultPage } from '../search-result/search-result';
import { Storage } from '@ionic/storage';
import { ProgressReviewPage } from '../progress-review/progress-review';
import { Geolocation } from '@ionic-native/geolocation';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'client-profile.html',
})
export class ProfilePage {

  @ViewChild('fileInput') fileInput;
  private locationData: any;
  private isReadyToSave: boolean;
  private item: any;
  private FrmUpdateProfile: FormGroup;
  private Id: any;
  private searchData: any;
  private servicesArray: any;
  private loading: any;
  private ClintProfileData: any;
  private updateData: any;
  private services: any;
  private ongoingServices: any;
  private searchURL: string;
  private searchKey: string;
  private token: string;
  private dateTime: any;
  private requestDateTime : any;
  private Nodata : boolean =false;
  [x: string]: any;

  constructor(public http: Http,
    public alertController: AlertController,
    public slideMenu: MenuController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,    
    public loadingController: LoadingController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public camera: Camera,
    public storage: Storage,
    public searchResultsProvider: ProvidersearchResultsProvider) {

    this.ClientMenu = "home";
    this.slideMenu.swipeEnable(true);
    this.FrmUpdateProfile = this.formBuilder.group({

      FirstName: [''],
      LastName: [''],
      Address: [''],
      Telephone: [''],
      DOB: [''],
      Password: [''],
      ConfirmPassword: [''],
      Gender: ['']
    });

    this.storage.get('StoredToken').then((token) => {
      console.log('Clients Stored token is', token);
      this.getLoginUserData(token);
      this.token = token;
      //this.getOngoingServices(token);          
    });

  }
  getLoginUserData(Token: String) {
    
        this.autharization = 'Bearer ' + Token;
        var headers = new Headers();
        headers.append('Authorization', this.autharization);
        headers.append('Accept', 'application/json');
        this.http.get('http://constructionlkapi.azurewebsites.net/customer/GetCustomerProfile', { headers: headers }).map(res => res.json())
          .subscribe(data => {
            console.log(data);
            this.userData = data;
            this.userId = this.userData.Id;
            this.storage.set('StoredID', this.userId);
            this.updateDate();
          }, error => {
            console.log(error);
          });
    
      }
  btnPosition() {

    let alert = this.alertController.create({
      title: 'Set Your Location',
      message: 'This wil update your current location and optimize the search result.',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Try It!',
          handler: () => {
            this.getUserCurrentPosition();
          }
        }
      ]
    });
    alert.present();
  }
  getUserCurrentPosition() {
    let loading = this.loadingController.create({ content: "Locating..." });
    loading.present();


    let locationOptions = { timeout: 10000, enableHighAccuracy: true };

    this.geolocation.getCurrentPosition(locationOptions).then(
      (position) => {
        loading.dismissAll();
        this.showToast('Location Found!');

        this.locationData = {
          Lon: position.coords.longitude,
          Lat: position.coords.latitude,
          Id: this.userId
        }

        console.log(this.locationData);
        this.updateUserCurrentPosition();
      },
      (error) => {
        loading.dismissAll();
        this.showToast('Please enable your GPS!');
      }
    )
  }

  updateUserCurrentPosition() {
    let loading = this.loadingController.create({ content: "Updating..." });
    loading.present();

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });


    this.http.post('http://constructionlkapi.azurewebsites.net/Customer/SetCustomerLocation', this.locationData, options)
      .subscribe(data => {
        loading.dismissAll();
        this.showToast("Location Updated!");
      }, error => {
        loading.dismissAll();
        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: 'Error Occured',
          buttons: ['OK']
        });
        alert.present();
        console.log(error);

      });

  }
  private callCustomer(): void {
    this.callNumber.callNumber(this.requestData.Phone, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }
  getOngoingServices() {

    let loading = this.loadingController.create({ content: "Loading..." });
    loading.present();
    this.autharization = 'Bearer ' + this.token;
    var headers = new Headers();
    headers.append('Authorization', this.autharization);
    //headers.append('Accept', 'application/json');
    this.http.get('http://constructionlkapi.azurewebsites.net/Customer/GetOnGoing', { headers: headers }).map(res => res.json())
      .subscribe(data => {
        this.ongoingServices = data;
        console.log(this.ongoingServices);
        //this.userId = this.requests.Id;
        loading.dismissAll();

      }, error => {
        loading.dismissAll();
        alert(error);
      });

  }
  moreOngoingServiceData(data: any) {
    console.log(data);
    this.navCtrl.push(ProgressReviewPage, { data: data });
  }
  hideSearch(event) {
    this.Nodata = true;
    this.searchData = null;
  }
  
  updateDate() {
    let date1 = this.userData.DateOfBirth.substring(0, 10);
    let date2 = date1.replace("-", "/");
    this.dateTime = {
      date :date2.replace("-", "/"),
      time: this.userData.DateOfBirth.substring(11, 16)
    };
  //_____________________Update profile_________________
  }
 
  //___________________Search engine part___________

  searchService(key: any) {
    console.log(key.target.value);
    this.searchKey = key.target.value;
    this.searchURL = 'http://constructionlkapi.azurewebsites.net/Search/FindByWord?key=' + this.searchKey;
    console.log(this.searchURL);
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    this.http.get(this.searchURL, { headers: headers }).map(res => res.json())
      .subscribe(data => {
        this.searchData = data;
        console.log(this.searchData);
      }, error => {
        console.log(error);
      });
  }
  searchButtonService(key: any) {
    console.log(key);
    this.searchKey = key;
    this.searchURL = 'http://constructionlkapi.azurewebsites.net/Search/FindByWord?key=' + this.searchKey;
    console.log(this.searchURL);
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    this.http.get(this.searchURL, { headers: headers }).map(res => res.json())
      .subscribe(data => {
        this.searchData = data;
        console.log(this.searchData);

      }, error => {
        console.log(error);
      })

  }
  moreSearchData(id) {
    console.log(id);
    this.navCtrl.push(SearchResultPage, { id: id });
  }
  updateProfile() {    
    this.updateData = this.FrmUpdateProfile.value;
    if (this.updateData.ConfirmPassword != this.updateData.Password) {
      alert("Password Mismatched");
    }else if(this.updateData.Password ==""){
      alert("Password is requiered");
    }else if(this.updateData.Gender ==""){
      alert("Gender is requiered");
    }
    else {
      this.updateData.Username = this.userData.Username;
      this.updateData.Id = this.userId;
      this.updateData.Subcribe = true;
      console.log(this.updateData);
      this.postUpdateProfile();
    }
  }

  postUpdateProfile(){
    let loading = this.loadingController.create({ content: "Updating..." });
    loading.present();

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });


    this.http.post('http://constructionlkapi.azurewebsites.net/Customer/UpdateCustomerProfile', this.updateData, options)
      .subscribe(data => {
        loading.dismissAll();
        this.showToast("Profile Updated!");
      }, error => {
        loading.dismissAll();
        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: 'Error Occured',
          buttons: ['OK']
        });
        alert.present();
        console.log(error);

      });

  }
  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
