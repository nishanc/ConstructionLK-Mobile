import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-test2',
  templateUrl: 'test2.html',
})
export class Test2Page  {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {


  }
  gotSearchInView(){
  }
}
