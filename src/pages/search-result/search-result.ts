import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersearchResultsProvider } from '../../providers/providersearch-results/providersearch-results';


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
export class SearchResultPage {
  language: String ;
  repos : any;
  personData : any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public searchResultsProvider:ProvidersearchResultsProvider ) {
  }
  ionViewDidLoad() {    
    console.log(this.navParams.get('id'));
    this.searchResultsProvider.moreSearchRepo(this.navParams.get('id')).subscribe(res => {
      console.log(res);
      this.personData = res;
    });

  }
  
  
 

  
  
  
}
