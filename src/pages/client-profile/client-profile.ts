import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { ProvidersearchResultsProvider } from '../../providers/providersearch-results/providersearch-results';
import { SearchResultPage } from '../search-result/search-result';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'client-profile.html',
})
export class ProfilePage {
  [x: string]: any;

  @ViewChild('fileInput') fileInput;
  isReadyToSave: boolean;
  item: any;
  form: FormGroup;
  Id: any;
  ClintProfileData : any;
  loading : any;
  //language: String ; //serach
  repos :any;//search

  constructor( public http:Http, 
    public alertController: AlertController,
    public slideMenu: MenuController,
    public navCtrl: NavController,
    public loadingCtrl:LoadingController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public  formBuilder: FormBuilder,
    public camera: Camera,
    public searchResultsProvider:ProvidersearchResultsProvider) {

    this.ClientMenu="home";
    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      about: ['']

    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    this.slideMenu.swipeEnable(true);

  }
  //___________________Search engine part___________
  searchService(key:any){
    console.log(key.target.value);
    console.log(this.language);

    const searchKeyData = {
      keyWord:key.target.value,
      lang : this.language
    };
    this.searchResultsProvider.searchRepo(searchKeyData).subscribe(res => {
      //console.log(res);
      this.repos = res.items;
    });
  }
  moreSearchData(id){
    console.log(id);
    this.navCtrl.push(SearchResultPage,{id:id});
  }
  //-------------------------------------------------
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
