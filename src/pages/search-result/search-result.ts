import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ProvidersearchResultsProvider } from '../../providers/providersearch-results/providersearch-results';
import { Http, Headers } from '@angular/http';
import { TestPage } from '../test/test';



/**
 * Generated class for the SearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage  {
  
  private searchURL: string;
  private searchId: string;
  private moreData: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public searchResultsProvider: ProvidersearchResultsProvider,
    public http: Http,    
    private platform: Platform) {
  }

  ionViewDidLoad() {
    // console.log(this.navParams.get('id'));
    this.searchId = this.navParams.get('id');
    var headers = new Headers();
    this.searchURL = 'http://constructionlkapi.azurewebsites.net/ItemService/GetServiceDetail?Id=' + this.searchId;
    headers.append('Accept', 'application/json');
    this.http.get(this.searchURL, { headers: headers }).map(res => res.json())
      .subscribe(data => {
        this.moreData = data;
        console.log(this.moreData);

      }, error => {
        console.log(error);
      })
  }
  pickLocation(){
    let id = this.searchId;
    this.navCtrl.push(TestPage,{id:id});
  }
}







