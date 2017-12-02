import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProfilePage } from '../pages/client-profile/client-profile';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { Camera } from '@ionic-native/camera';
import { UserMapPage } from '../pages/user-map/user-map';
import { SearchResultPage } from '../pages/search-result/search-result';
import { AboutPage } from '../pages/about/about';
import { TestPage } from '../pages/test/test';
import { HttpModule } from '@angular/http';
import { ConstructorProfilePage } from '../pages/constructor-profile/constructor-profile';
import { Test2Page } from '../pages/test2/test2';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { ProvidersearchResultsProvider } from '../providers/providersearch-results/providersearch-results';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchResultPage,
    ProfilePage,
    SignUpPage,
    UserMapPage,
    AboutPage,
    TestPage,
    ConstructorProfilePage,
    Test2Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchResultPage,    
    ProfilePage,
    SignUpPage,
    UserMapPage,
    AboutPage,
    TestPage,
    ConstructorProfilePage,
    Test2Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},   
    ProvidersearchResultsProvider,
    IonicStorageModule
  ]
})
export class AppModule {}
