import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ProvidersearchResultsProvider } from '../../providers/providersearch-results/providersearch-results';
import { Http, Headers } from '@angular/http';
import { TestPage } from '../test/test';
import { PaymentsPage } from '../payments/payments';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage  {
  properties: any;
  Provider: any;
  
  private searchURL: string;
  private searchId: string;
  private moreData: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public searchResultsProvider: ProvidersearchResultsProvider,
    public http: Http,
    public storage: Storage,    
    private platform: Platform) {
      this.searchId = this.navParams.get('id'); 
  }

  ionViewDidLoad() {
    var headers = new Headers();
    this.searchURL = 'http://constructionlkapi.azurewebsites.net/ItemService/GetServiceDetail?Id=' + this.searchId;
    headers.append('Accept', 'application/json');
    this.http.get(this.searchURL, { headers: headers }).map(res => res.json())
      .subscribe(data => {
        
        this.moreData = data;
        this.Provider = this.moreData.Provider;
        this.properties = this.moreData.properties;
        console.log(this.moreData);

      }, error => {
        console.log(error);
      })
  }
  goToPayment(){
    
    this.storage.set('serviceId', this.searchId);
    // let id=this.searchId;
     this.navCtrl.push(PaymentsPage);
  }
}







