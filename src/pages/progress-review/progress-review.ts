import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, Platform, ActionSheetController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import { ProfilePage } from '../client-profile/client-profile';
@IonicPage()
@Component({
  selector: 'page-progress-review',
  templateUrl: 'progress-review.html',
})
export class ProgressReviewPage {
  private values: number[];//Array<number>;
  private testRadioResult: any;
  private testRadioOpen: boolean;
  private testCheckboxResult: any;
  private testCheckboxOpen: boolean;
  private progressHistory: any;
  private isFinishPressed : boolean = false;
  private Data: any;
  private lineChartEl: any;
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;
  public lineChartColors: Array<any>;
  public lineChartLegend: boolean;
  public lineChartType: string;
  public lineChartOptions: any;
  private autharization: string;
  private dateTime : any;
  private requestId: string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public http: Http,
    public storage: Storage,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private callNumber: CallNumber,
    public platform: Platform,    
    public actionsheetCtrl: ActionSheetController
  ) {
    //this.createLineChart();
    this.Data = this.navParams.get('data');
    console.log(this.Data);
    this.storage.get('StoredToken').then((token) => {
      console.log('Clients Stored token is', token);
      this.autharization = 'Bearer ' + token;
      this.getProgress();
    });
    this.dateTime = {
      date : this.Data.Date.substring(0, 10),
      time : this.Data.Date.substring(11, 16)
    };
    this.storage.get('StoredID').then((reqId) => {
      console.log('Clients Stored reqId is', reqId);
      this.requestId = reqId;
    });
  }
  
  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'What happen to the service requirment?',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Job Completed Successfull',         
          icon: !this.platform.is('ios') ? 'ios-checkmark-circle' : null,
          handler: () => {
            this.jobFinishedSuccessfully();
          }
        },
        {
          text: 'Job Not Completed',
          icon: !this.platform.is('ios') ? 'ios-alert' : null,
          handler: () => {
            this.postNotSuccessfullyCompleted();
            
          }
        },
        {
          text: 'Could Not Start the Job',
          icon: !this.platform.is('ios') ? 'ios-close-circle' : null,
          handler: () => {
            this.postCouldNotStart()
            
          }
        },
       
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

//_________________________________Job finished completly______________________
  jobFinishedSuccessfully() {

    let alert = this.alertCtrl.create();
    alert.setTitle('Rate service provider and confirm finished.');
    
    alert.addInput({
      type: 'radio',
      label: 'Excellent',
      value: '5',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Good',
      value: '4'
    });

    alert.addInput({
      type: 'radio',
      label: 'Fair',
      value: '3'
    });

    alert.addInput({
      type: 'radio',
      label: 'Poor',
      value: '2'
    });

    alert.addInput({
      type: 'radio',
      label: 'Bad',
      value: '1',

    });

    

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Finish',
      handler: (data: any) => {
        console.log('Radio data:', data);
        this.isFinishPressed = true;
        this.postSuccessfullyCompleted();
        this.postRating(data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });

    alert.present();
  }
postRating(rate : number){
  
  console.log('Rate :', rate);
  let loading = this.loadingController.create({content : "Sending Request..."});
  loading.present();
 
  let rateData={
    PostId :this.requestId,
    ReqId :this.Data.ReqId,
    ProvId : this.Data.UserId,
    Value :rate
  }
 console.log(rateData);
  var headers = new Headers();  
  headers.append('Content-Type', 'application/json');
  let options = new RequestOptions({ headers: headers }); 
  this.http.post('http://constructionlkapi.azurewebsites.net/Rating/RateOnServiceProvider', rateData, options)
    .subscribe(data => {  
      loading.dismissAll();        
      this.showToast("Service provider was rated!") ;
      this.navCtrl.push(ProfilePage);  
      
    }, error => {
      loading.dismissAll();
      let alert = this.alertCtrl.create({
        title: 'Sorry',
        subTitle: error._body,
        buttons: ['OK']
      });
      alert.present();
      console.log(error);
    });
}
postSuccessfullyCompleted(){
  let loading = this.loadingController.create({ content: "Updating..." });
  loading.present();
  let URL = 'http://constructionlkapi.azurewebsites.net//Customer/JobDone?reqId='+ this.Data.ReqId;
  console.log(URL);
  var headers = new Headers();
  headers.append('Authorization', this.autharization);
  //headers.append('Accept', 'application/json');
  this.http.get(URL, { headers: headers }).map(res => res.json())
    .subscribe(data => {      
      
      loading.dismissAll();
      this.isFinishPressed = true;
      this.showToast("Successfully Updated!");
    }, error => {
      loading.dismissAll();
      console.log("Server error:"+error);
    });

}
postNotSuccessfullyCompleted(){
  let loading = this.loadingController.create({ content: "Updating..." });
  loading.present();
  let URL = 'http://constructionlkapi.azurewebsites.net//Customer/JobNotDone?reqId='+ this.Data.ReqId;
  console.log(URL);
  var headers = new Headers();
  headers.append('Authorization', this.autharization);
  //headers.append('Accept', 'application/json');
  this.http.get(URL, { headers: headers }).map(res => res.json())
    .subscribe(data => {   
      loading.dismissAll();  
      this.isFinishPressed = true; 
      this.showToast("Successfully Updated!");
    }, error => {
      loading.dismissAll();
      this.isFinishPressed = true; 
      this.showToast("Successfully Updated!");
      console.log("Server error:"+error);
    });

}
postCouldNotStart(){
  let loading = this.loadingController.create({ content: "Updating..." });
  loading.present();
  let URL = 'http://constructionlkapi.azurewebsites.net/Customer/CannotStartDeal?reqId='+ this.Data.ReqId;
  console.log(URL);
  var headers = new Headers();
  headers.append('Authorization', this.autharization);
  //headers.append('Accept', 'application/json');
  this.http.get(URL, { headers: headers }).map(res => res.json())
    .subscribe(data => { 
      loading.dismissAll();   
      this.isFinishPressed = true;  
      this.showToast("Successfully Updated!");
    }, error => {
      loading.dismissAll();
      this.isFinishPressed = true; 
      this.showToast("Successfully Updated!");
      console.log("Server error:"+error);
    });

} 


getProgress() {
  let URL = 'http://constructionlkapi.azurewebsites.net/Customer/GetProgressHistory/?reqId='+ this.Data.ReqId;
  console.log(URL);
  var headers = new Headers();
  headers.append('Authorization', this.autharization);
  //headers.append('Accept', 'application/json');
  this.http.get(URL, { headers: headers }).map(res => res.json())
    .subscribe(data => {
      this.progressHistory = data;
      console.log(this.progressHistory);
      if (this.progressHistory)
      this.createLineChart(this.progressHistory);
    }, error => {
      alert("Server error");
    });

  
}
createLineChart(progress:any) {
  console.log(progress);
  console.log(progress.values);
  // this.values = progress.values;
  this.lineChartData = [
     {data: progress.values,
       label: 'Progress',
       
      }
  ];
  this.lineChartLabels = progress.years;
  this.lineChartOptions = {
    responsive: true,
    maintainAspectRatio : false,
    
  };
  this.lineChartColors = [
    { // grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgb(221, 177, 16)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }

  ];
  this.lineChartLegend = true;
  this.lineChartType = 'line';
}
showToast(message) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: 3000
  });
  toast.present();
}
}



