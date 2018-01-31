import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ProgressReviewPage } from '../progress-review/progress-review';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

import { Test2Page } from '../test2/test2';
/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})

export class ForgotPasswordPage {
  private token: string;
  private autharization: string;
  private URL: string;
  private phoneNo: string;
  private phoneData: any;
  FrmForgotPW = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public http: Http,
    public storage: Storage) {

  }
 
  getNewPassword() {
    console.log(this.FrmForgotPW);
    this.phoneData = this.FrmForgotPW;
    this.phoneNo = this.phoneData.number;
    let loading = this.loadingController.create({ content: "Verifing.." });
    loading.present();

    this.storage.get('StoredToken').then((token) => {
      this.token = token;
    });
    //this.autharization = 'Bearer '+this.token;
    //console.log('Clients Stored token is',this.autharization);
    this.URL = 'http://constructionlkapi.azurewebsites.net/customer/FogotPassword?phone=' + this.phoneNo;
    // console.log(this.URL);
    var headers = new Headers();
    //headers.append('Authorization',this.autharization);
    //headers.append('Accept', 'application/json');
    this.http.get(this.URL).map(res => res.json())
      .subscribe(data => {
        console.log(data);
        loading.dismissAll();
        let alert = this.alertCtrl.create({
          title: 'Message',
          subTitle: 'You will receive a tempory password shortly.',
          buttons: ['OK']
        });
        alert.present();
      }, error => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: 'Phone number is missed match!',
          buttons: ['Retry']
        });
        alert.present();
        loading.dismissAll();
      })
    loading.dismissAll();
  }


}
