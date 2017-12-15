import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { UserMapPage } from '../pages/user-map/user-map';
import { AboutPage } from '../pages/about/about';
import { ProfilePage } from '../pages/client-profile/client-profile';
import { TestPage } from '../pages/test/test';
import { ConstructorProfilePage } from '../pages/constructor-profile/constructor-profile';
import { Test2Page } from '../pages/test2/test2';
import { PaymentsPage } from '../pages/payments/payments';
import { MapDirctionsPage } from '../pages/map-dirctions/map-dirctions';
//import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html',
  //template: '<ion-nav *ngIf="showRoot" [root]="rootPage"></ion-nav>'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  LocationPage:any;
  MainHomePage:any;
  AboutUsPage:any;
  TempPaymentPage : any;
  TempMapDirctionsPage : any;
  TempTestPage:any;
  TempTest2Page:any;
  TempConstructProfilpage: any;
  pages: Array<{title: string, component: any}>;

  

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen) {
    this.initializeApp();
    // this.storage.get('CurrntRootPage').then((logged) => {
     
    //     if(logged == 'ProfilePage'){
    //       this.rootPage = ProfilePage;
    //     }else if(logged == 'ConstructorProfilePage'){
    //       this.nav.setRoot(ConstructorProfilePage);
    //     }
    
    //     this.showRoot = true;
    //   //console.log('Stored root is', val);
    // });
    // used for an example of ngFor and navigation
    this.pages = [
     
      { title: 'Home', component: ProfilePage },
      { title: 'Your Location', component: UserMapPage },
      { title: 'Test', component: TestPage },
      { title: 'Logout', component: HomePage },
      { title: 'About', component: AboutPage },
      { title: 'Constructer Home', component: ConstructorProfilePage },
      { title: 'Test 2', component: Test2Page },
      { title: 'Paypal', component: PaymentsPage },
      { title: 'Paypal', component: MapDirctionsPage }
      

    ];
    this.LocationPage = this.pages[1];
    this.MainHomePage = this.pages[0];
    this.TempTestPage = this.pages[2];
    this.AboutUsPage = this.pages[3];
    this.TempConstructProfilpage = this.pages[4];
    this.TempTest2Page = this.pages[5];
    
    this.TempMapDirctionsPage = this.pages[7];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }
 

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.LocationPage = page;
    this.MainHomePage = page;
    this.AboutUsPage = page;
    this.TempTestPage = page;
    this.TempConstructProfilpage = page;
    this.TempTest2Page = page;
    this.TempPaymentPage = page;
    this.TempMapDirctionsPage = page;
  }
}
