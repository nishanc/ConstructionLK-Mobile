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
import { SearchResultPage } from '../pages/search-result/search-result';
import { AboutPage } from '../pages/about/about';
import { HttpModule } from '@angular/http';
import { ConstructorProfilePage } from '../pages/constructor-profile/constructor-profile';
import { Test2Page } from '../pages/test2/test2';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { ProvidersearchResultsProvider } from '../providers/providersearch-results/providersearch-results';
import { ProviderGetUserProvider } from '../providers/provider-get-user/provider-get-user';
import { PaymentsPage } from '../pages/payments/payments';
import { PaymentsPageModule } from '../pages/payments/payments.module';
import { Stripe } from '@ionic-native/stripe';
import { AddServicePage } from '../pages/add-service/add-service';
import { Diagnostic } from '@ionic-native/diagnostic';
import { GoogleMaps } from '@ionic-native/google-maps';
import { MapDirctionsPage } from '../pages/map-dirctions/map-dirctions';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { ProgressReviewPage } from '../pages/progress-review/progress-review';
import { TestPage } from '../pages/test/test';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchResultPage,
    ProfilePage,
    SignUpPage,    
    AboutPage,
    PaymentsPage,
    AddServicePage,
    MapDirctionsPage,
    ForgotPasswordPage,
    ProgressReviewPage,
    TestPage,
    ConstructorProfilePage,
    Test2Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
   // PaymentsPageModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchResultPage,    
    ProfilePage,
    SignUpPage,    
    AboutPage,
    PaymentsPage,
    AddServicePage,
    MapDirctionsPage,
    ForgotPasswordPage,
    ProgressReviewPage,
    TestPage,
    ConstructorProfilePage,
    Test2Page
  ],
  providers: [
    GoogleMaps,
    Diagnostic,
    StatusBar,
    SplashScreen,
    Camera,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},   
    ProvidersearchResultsProvider,
    IonicStorageModule,
    Storage,
    ProviderGetUserProvider,
    Stripe
    
  ]
})
export class AppModule {}
