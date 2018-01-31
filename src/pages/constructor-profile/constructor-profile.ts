import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AddServicePage } from '../add-service/add-service';
import { RequestDetailsPage } from '../request-details/request-details';
import { ServiceDetailsPage } from '../service-details/service-details';
import { ProgressUpdatePage } from '../progress-update/progress-update';


@IonicPage()
@Component({
  selector: 'page-constructor-profile',
  templateUrl: 'constructor-profile.html',
})
export class ConstructorProfilePage {
  [x: string]: any;
  @ViewChild('fileInput') fileInput;
  private isReadyToSave: boolean;
  private userData: any;
  private userId: any;
  private form: FormGroup;
  private requests: any;
  private acceptedRequests: any;
  private myServices: any;
  private localToken: string;
  private imgSrc: string;

  constructor(
    public slideMenu: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,   
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
    public camera: Camera,
    public http: Http,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {
    this.ConstructorMenu = "home";
    
    this.form = formBuilder.group({
      //Avatar: [''],
      FirstName: [''],
      LastName: [''],
      BasedCity: [''],
      Telephone: [''],
      MailingAddress: [''],
      CompanyName: [''],
      Bio: [''],
      //CompanyRegNo:[''],
      //StartedDate:[''],
      Password: [''],
      ConfirmPassword: ['']
    });
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
    this.slideMenu.swipeEnable(true);

    this.storage.get('StoredToken').then((token) => {
      this.localToken = token;
      console.log(token);
      this.getLoginUserData(token);

    });
  }
  getLoginUserData(Token: String) {
    let loading = this.loadingController.create({ content: "Loading..." });
    loading.present();
    this.autharization = 'Bearer ' + Token;
    var headers = new Headers();
    headers.append('Authorization', this.autharization);
    headers.append('Accept', 'application/json');
    this.http.get('http://constructionlkapi.azurewebsites.net/ServiceProvider/GetProfile', { headers: headers }).map(res => res.json())
      .subscribe(data => {
        loading.dismissAll();
        this.userData = data;
        console.log(this.userData);
        this.userId = this.userData.Id;
        this.storage.set('StoredID', this.userId); //store the current user ID     
        this.getRequests();
      }, error => {
        loading.dismissAll();
        console.log(error);
      });
  }
  getProfilePic(){
    this.imgSrc = 'http://constructionlkapi.azurewebsites.net/Image/GetProiverImage?id=105';//+this.userId;
  }
  //________________show offered services_________
  getMyServices() {
    let loading = this.loadingController.create({ content: "Loading..." });
    loading.present();
    this.autharization = 'Bearer ' + this.localToken;
    var headers = new Headers();
    headers.append('Authorization', this.autharization);
    headers.append('Accept', 'application/json');
    this.http.get('http://constructionlkapi.azurewebsites.net/ServiceProvider/GetServiceItems', { headers: headers }).map(res => res.json())
      .subscribe(data => {
        loading.dismissAll();
        this.myServices = data;
        console.log(this.myServices);
        //this.userId = this.requests.Id;

        
      }, error => {
        loading.dismissAll();
        console.log(error);
      })

    
  }

  moreServiceData(id) {
    console.log(id);
    this.navCtrl.push(ServiceDetailsPage, { id: id });
  }
  //________________show new  Client requests_________

  getRequests() {
    let loading = this.loadingController.create({ content: "Loading..." });
    loading.present();
    this.autharization = 'Bearer ' + this.localToken;
    var headers = new Headers();
    headers.append('Authorization', this.autharization);
    headers.append('Accept', 'application/json');
    this.http.get('http://constructionlkapi.azurewebsites.net/ServiceProvider/GetJobs', { headers: headers }).map(res => res.json())
      .subscribe(data => {
        this.requests = data;
        console.log(this.requests);
        //this.userId = this.requests.Id;

        loading.dismissAll();
      }, error => {
        console.log(error);
      })

    loading.dismissAll();
    this.getAcceptedRequests();
  }
  moreRequestData(data: any) {
    console.log(data);
    this.navCtrl.push(RequestDetailsPage, { data: data });
  }
   //________________show accepted  Client requests_________
   getAcceptedRequests() {
    // let loading = this.loadingController.create({content : "Loading..."});
    // loading.present();
    this.autharization = 'Bearer ' + this.localToken;
    var headers = new Headers();
    headers.append('Authorization', this.autharization);
    headers.append('Accept', 'application/json');
    this.http.get('http://constructionlkapi.azurewebsites.net/ServiceProvider/GetOnGoing', { headers: headers }).map(res => res.json())
      .subscribe(data => {
        this.acceptedRequests = data;
        console.log(this.acceptedRequests);
        //this.userId = this.requests.Id;

        // loading.dismissAll();
      }, error => {
        console.log(error);
      })

    // loading.dismissAll();
  }
 
  moreAcceptedRequestData(data: any) {
    console.log(data);
    this.navCtrl.push(ProgressUpdatePage, { data: data });
  }




  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'Avatar': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }
  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'Avatar': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }
  getProfileImageStyle() {
    return 'url(' + this.form.controls['Avatar'].value + ')'
  }
  addService() {
    this.navCtrl.push(AddServicePage);
  }
  postUpadtedProfile() {
    this.updateDetails = this.form.value;
    if (this.updateDetails.ConfirmPassword != this.updateDetails.Password) {
      alert("Password Mismatched");
    }else if(this.updateDetails.Password == ""){
      
      alert("Password field is required");
      
    }
    else {
      this.updateDetails.Id = this.userId;
      this.updateDetails.Avatar = null;
      this.updateDetails.CompanyRegNo = this.userData.CompanyRegNo;
      this.updateDetails.StartedDate = this.userData.StartedDate;
      this.updateDetails.Username = this.userData.Username;      
      delete this.updateDetails.ConfirmPassword;
      console.log(this.updateDetails);

      let loading = this.loadingController.create({ content: "Updating..." });
      loading.present();
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      let options = new RequestOptions({ headers: headers });
      let postParams = this.updateDetails;
      this.http.post('http://constructionlkapi.azurewebsites.net/ServiceProvider/UpdateServiceProvider', postParams, options)
        .subscribe(data => {
          loading.dismissAll();
          this.showToast("Profile Updated!");
          this.getLoginUserData(this.localToken);
        }, error => {
          loading.dismissAll();
          let alert = this.alertCtrl.create({
            title: 'Sorry',
            subTitle: "Error Occured",
            buttons: ['OK']
          });
          alert.present();
          console.log(error);
        })
    }
    
  }
  
  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
