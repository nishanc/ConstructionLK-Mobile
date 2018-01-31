import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ProfilePage } from '../pages/client-profile/client-profile';
import { ConstructorProfilePage } from '../pages/constructor-profile/constructor-profile';
import { Test2Page } from '../pages/test2/test2';
import { PaymentsPage } from '../pages/payments/payments';
import { MapDirctionsPage } from '../pages/map-dirctions/map-dirctions';

@Component({
  templateUrl: 'app.html',
  //template: '<ion-nav *ngIf="showRoot" [root]="rootPage"></ion-nav>'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage; 
  MainHomePage:any;
  AboutUsPage:any;
  TempPaymentPage : any;
  TempMapDirctionsPage : any;  
  TempTest2Page:any;
  TempConstructProfilpage: any;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public modalCtrl: ModalController) {
    this.initializeApp();
    
    this.pages = [     
           
      { title: 'Logout', component: HomePage },
      { title: 'About', component: AboutPage },
      //{ title: 'Constructer Home', component: ConstructorProfilePage },     
     
    ];
    
    this.MainHomePage = this.pages[1];    
    this.AboutUsPage = this.pages[0];
    //this.TempConstructProfilpage = this.pages[2];
    //this.TempTest2Page = this.pages[3];    
    //this.TempMapDirctionsPage = this.pages[4];
    //this.TempPaymentPage = this.pages[5];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }
 

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    
    this.MainHomePage = page;
    this.AboutUsPage = page;    
    //this.TempConstructProfilpage = page;
    //this.TempTest2Page = page;
    //this.TempPaymentPage = page;
    //this.TempMapDirctionsPage = page;
  }
}
