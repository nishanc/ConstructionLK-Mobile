import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Http,Headers } from '@angular/http';
import { AddServicePage } from '../add-service/add-service';


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
  private requests :any;
  private localToken : string;
  constructor(
    public slideMenu: MenuController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
    public camera: Camera,
    public http: Http,
    public storage: Storage
    ) {
    this.ConstructorMenu="profile";
    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      about: [''],
      FirstName:  [''],
      LastName:  [''],            
      BasedCity: [''],           
      Telephone:  [''],      
      MailingAddress:[''],
      Bio:[''],
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
//________________show offered services_________
getMyServices(){
  
}
//________________show  Client requests_________
  getRequests() {
    let loading = this.loadingController.create({content : "Loading..."});
    loading.present();
    this.autharization = 'Bearer '+this.localToken; 
    var headers = new Headers();
    headers.append('Authorization',this.autharization);
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
    this.storage.get('StoredToken').then((val) => {
      
    });
    loading.dismissAll();
  }
  moreSearchData(id){
    console.log(id);
    //this.navCtrl.push(SearchResultPage,{id:id});
  }

  getLoginUserData(Token: String) {
    let loading = this.loadingController.create({content : "Loading..."});
    loading.present();
    this.autharization = 'Bearer '+Token; 
    var headers = new Headers();
    headers.append('Authorization',this.autharization);
    headers.append('Accept', 'application/json');
    this.http.get('http://constructionlkapi.azurewebsites.net/ServiceProvider/GetProfile', { headers: headers }).map(res => res.json())
    .subscribe(data => {
      this.userData = data;
      console.log(this.userData);
      this.userId = this.userData.Id;
      this.storage.set('StoredID', this.userId); //store the current user ID
      // this.storage.get('StoredID').then((val) => {
      //   console.log(val);
      // });
      loading.dismissAll();
    }, error => {
      console.log(error);
    })
    this.storage.get('StoredToken').then((val) => {
      
    });
    loading.dismissAll();
  }

  
  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
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
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }
  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }
  addService(){
    this.navCtrl.push(AddServicePage);
  }
  postUpadtedProfile(){
    console.log(this.form.value);
  }
}
