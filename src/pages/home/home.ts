import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { SignUpPage } from '../sign-up/sign-up';
//import { ProfilePage } from '../client-profile/client-profile'
import { Http, Headers, RequestOptions } from '@angular/http';
//import { Storage } from '@ionic/storage';
//import { ConstructorProfilePage } from '../constructor-profile/constructor-profile';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
 
  private parameters: string;
  private UserDetails: any;
  private Token :string;
  private FrmLogin: FormGroup;
  constructor(
    public slideMenu: MenuController,
    public navCtrl: NavController,
    public http:Http,
    private LoginFormBuilder: FormBuilder,
    private alertCtrl: AlertController) {
    this.slideMenu.swipeEnable(true);
  }
  postLogin() {
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
        console.log(this.Token);
      }, error => {
        console.log(error);
        let alert = this.alertCtrl.create({    
          title: 'Sorry',      
          subTitle: 'Username or password is incorrect.',
          buttons: ['Retry']
        });
        alert.present();
      })
      

  }
  setToken(){

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
