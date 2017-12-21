import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http,Headers } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { ProvidersearchResultsProvider } from '../../providers/providersearch-results/providersearch-results';
import { SearchResultPage } from '../search-result/search-result';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'client-profile.html',
})
export class ProfilePage {
  
  @ViewChild('fileInput') fileInput;

  private isReadyToSave: boolean;
  private item: any;
  private FrmUpdateProfile: FormGroup;
  private Id: any;
  private searchData: any;
  private servicesArray: any;
  private loading : any;
  private ClintProfileData : any;
  private services : any;  
  private repos :any; //search
  private searchURL : string;
  private searchKey : string;
  [x: string]: any;
  
  constructor( public http:Http, 
    public alertController: AlertController,
    public slideMenu: MenuController,
    public navCtrl: NavController,
    public loadingCtrl:LoadingController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public camera: Camera,
    public storage: Storage,
    public searchResultsProvider:ProvidersearchResultsProvider) {

    this.ClientMenu="home";
    this.slideMenu.swipeEnable(true);
    this.FrmUpdateProfile = this.formBuilder.group({
      
            FirstName:  [''],
            LastName:  [''],            
            Address: [''],           
            Telephone:  [''],
            DateOfBirth:  [''],
            
          });
          this.storage.get('StoredToken').then((token) => {
            console.log('Clients Stored token is', token);
            this.getLoginUserData(token);            
          });
  }
  getLoginUserData(Token: String) {
   
    this.autharization = 'Bearer '+Token; 
    var headers = new Headers();
    headers.append('Authorization',this.autharization);
    headers.append('Accept', 'application/json');
    this.http.get('http://constructionlkapi.azurewebsites.net/customer/GetCustomerProfile', { headers: headers }).map(res => res.json())
    .subscribe(data => {
      this.userData = data;
      this.userId = this.userData.Id;
      this.storage.set('StoredID', this.userId);
    
    }, error => {
      console.log(error);
    })
       
  }
  updateProfile(){

  }
  //___________________Search engine part___________
  
  searchService(key:any){
    console.log(key.target.value);
    this.searchKey = key.target.value;
    this.searchURL = 'http://constructionlkapi.azurewebsites.net/Search/FindByWord?key='+this.searchKey;
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
  moreSearchData(id){
    console.log(id);
    this.navCtrl.push(SearchResultPage,{id:id});
  }
  //-------------------------------------------------
  
  clkElectrician(){
    
    // let confirm = this. alertController.create({
    //   title: 'Use this lightsaber?',
    //   message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
    //   buttons: [
    //     {
    //       text: 'Disagree',
    //       handler: () => {
    //         console.log('Disagree clicked');
    //       }
    //     },
    //     {
    //       text: 'Agree',
    //       handler: () => {
    //         console.log('Agree clicked');
    //       }
    //     }
    //   ]
    // });
    // confirm.present();
  
  }
  clkACServic(){}
  clkPlumber(){}
  clkWelding(){}
  clkComputerNetworking(){}
  clkPainter(){}
  clkLandscaping(){}
 
  // getClientProfileData(){
  //   this.httpCustomerServiceProvider.getJsonClientData().subscribe(
  //     result => {
  //       this.ClintProfileData=result.data;
  //       console.log("Success : "+this.ClintProfileData);
  //     },
  //     err =>{
  //       console.error("Error : "+err);
  //     } ,
  //     () => {
  //       console.log('getData completed');
  //     }
  //   );
  // }
  

}
