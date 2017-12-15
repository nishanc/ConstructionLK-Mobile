import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { SignUpPage } from '../sign-up/sign-up';
import { ProfilePage } from '../client-profile/client-profile'
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ConstructorProfilePage } from '../constructor-profile/constructor-profile';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  //providers: [Storage]
})
export class HomePage implements OnInit {

  private parameters: string;
  private UserDetails: any;
  private UserRole: any;
  private Token: string;
  private FrmLogin: FormGroup;
  private autharization : string;

  constructor(
    public slideMenu: MenuController,
    public navCtrl: NavController,
    public http: Http,
    public loadingController: LoadingController,
    private LoginFormBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public storage: Storage) {
      
    this.slideMenu.swipeEnable(true);
  }
  postLogin() {
    //let loading = this.loadingController.create({content : "Logging in ,please wait..."});
    let loading = this.loadingController.create({content : "Logging in ,please wait..."});
    loading.present();
    this.UserDetails = this.FrmLogin.value;
    this.parameters = 'username=' + this.UserDetails.Username + '&password=' + this.UserDetails.Password + '&grant_type=password';
    console.log(this.parameters);
    let postParams = this.parameters;
    var headers = new Headers();
    headers.append("Content-Type", 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    this.http.post('http://constructionlkapi.azurewebsites.net/token', postParams, options).map(res => res.json())
      .subscribe(token => {
        this.Token = token.access_token;
        //console.log(this.Token);
        this.storage.set('StoredToken', this.Token);
        this.getUserRole(this.Token);
        //this.getLoginUserData(this.Token);
        loading.dismissAll();
      }, error => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: 'Username or password is incorrect.',
          buttons: ['Retry']
        });
        alert.present();
        loading.dismissAll();
      })      
  }
  getUserRole(Token: String){ //Get user role
    
    this.autharization = 'Bearer '+Token; 
    var headers = new Headers();
    headers.append('Authorization',this.autharization);
    headers.append('Accept', 'application/json');
    this.http.get('http://constructionlkapi.azurewebsites.net/api/Account/GetRoles', { headers: headers }).map(res => res.json())
    .subscribe(roles => {
      this.UserRole = roles;
        console.log("User is a ", this.UserRole.roles[0]);
        if(this.UserRole.roles[0]== 'Customer'){
          this.navCtrl.push(ProfilePage); //Push to cutomer profile
          this.storage.set('CurrntRootPage', 'ProfilePage');
        }else{
          this.navCtrl.push(ConstructorProfilePage); //Push to cconstructor profile
          this.storage.set('CurrntRootPage', 'ConstructorProfilePage');
        }
    }, error => {
      console.log(error);
      let alert = this.alertCtrl.create({
        title: 'Sorry',
        subTitle: error,
        buttons: ['Retry']
      });
      alert.present();
    })
    this.storage.get('StoredToken').then((val) => {
      console.log('Stored token is', val);
    });
    
  }

  
  signup() {
    this.navCtrl.push(SignUpPage);
  }
  ngOnInit() {
    this.FrmLogin = this.LoginFormBuilder.group({
      Username: new FormControl('', [Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])]),
      Password: ['', Validators.required],
    });
  }



}
