import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import { MapDirctionsPage } from '../map-dirctions/map-dirctions';

@IonicPage()
@Component({
  selector: 'page-progress-update',
  templateUrl: 'progress-update.html',
})
export class ProgressUpdatePage {

  @ViewChild('pieChart') pieChart;  
  private dateTime: any;
  private chartLoading: any;
  private pieChartEl: any;
  private ongoingProgress: any;
  private update: any;
  private requestData: any;
  private getURL: string;
  private serviceId: any;
  private autharization: string;
  private URL: string;
  private serviceLocation: any;
  private Frmprogress = {};
  private percentage: number;
  public doughnutChartLabels: string[];
  public doughnutChartData: number[];
  public doughnutChartType: string;
  private testRadioResult: any;
  private testRadioOpen: boolean;
  private testCheckboxResult: any;
  private testCheckboxOpen: boolean;
  private requestId : any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public http: Http,
    public storage: Storage,
    public toastCtrl: ToastController,    
    public alertCtrl: AlertController,
    private callNumber: CallNumber) {

    this.requestData = this.navParams.get('data');

    this.storage.get('StoredToken').then((token) => {
      console.log('Clients Stored token is', token);
      this.autharization = 'Bearer ' + token;;
      this.getProgress();
    });
    this.dateTime = {
      date: this.requestData.Date.substring(0, 10),
      time: this.requestData.Date.substring(11, 16)
    };
    this.storage.get('StoredID').then((reqId) => {
      console.log('Clients Stored reqId is', reqId);
      this.requestId = reqId;
    });
  }

  updateProgress() {
    let loading = this.loadingController.create({ content: "Updating..." });
    loading.present();
    this.update = this.Frmprogress;
    console.log(this.update);
    let updateData = {
      reqId: this.requestData.ReqId,
      comment: this.update.comment,
      value: this.update.value
    }
    console.log(updateData);
    console.log(this.autharization);
    var headers = new Headers();
    headers.append('Authorization', this.autharization);
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.http.post('http://constructionlkapi.azurewebsites.net/ServiceProvider/MarkProgress', updateData, options)
      .subscribe(data => {
        this.showToast("Successfully Updated!");
        this.getProgress();
        loading.dismissAll();
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
  private callCustomer(): void {
    this.callNumber.callNumber(this.requestData.Phone, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }
  
  rateCustomer() {
    
        let alert = this.alertCtrl.create();
        alert.setTitle('Rate Customer');
        
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
          text: 'OK',
          handler: (data: any) => {
            console.log('Radio data:', data);
            
            
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
        ReqId :this.requestData.ReqId,
        CusId : 4130, 
        Value :rate
      }
      console.log(rateData);
     
      var headers = new Headers();  
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers }); 
      this.http.post('http://constructionlkapi.azurewebsites.net/Rating/RateOnCustomer', rateData, options)
        .subscribe(data => {  
          loading.dismissAll();        
          this.showToast("Customer was rated!") ;
          
          
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

  getRoute() {
    this.serviceLocation = this.requestData.location;
    delete this.serviceLocation.Id;
    let data = this.serviceLocation;
     console.log(data);
     this.navCtrl.push(MapDirctionsPage, { data });
    // var modalPage = this.modalCtrl.create('MapDirctionsPage',data);
    // modalPage.present();
  }

  getProgress() {
    this.URL = 'http://constructionlkapi.azurewebsites.net/ServiceProvider/GetProgress/?reqId=' + this.requestData.ReqId;

    var headers = new Headers();
    headers.append('Authorization', this.autharization);
    //headers.append('Accept', 'application/json');
    this.http.get(this.URL, { headers: headers }).map(res => res.json())
      .subscribe(data => {
        this.ongoingProgress = data;
        this.percentage = this.ongoingProgress.value;
        console.log("percentage" + this.percentage);
        if (this.percentage)
          this.createPieChart(this.percentage);
      }, error => {
        //alert("Server error");
      });


  }
  createPieChart(n) {
    console.log(n);

    this.doughnutChartData = [n, 100 - n];
   
    this.pieChartEl = new Chart(this.pieChart.nativeElement,
      {
        type: 'doughnut',
        data: {
          labels: ['Completed(%)', 'Ongoing(%)'],
          datasets: [{
            label: '',
            data: this.doughnutChartData,
            duration: 1500,
            easing: 'easeInQuart',
            backgroundColor: ['rgb(221, 177, 16)', '#002b36'],
            hoverBackgroundColor: ['rgb(221, 177, 19)', '#000000']
          }]
        },
        options: {
          maintainAspectRatio: true,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0

            }

          },
          animation: {
            duration: 2000
          }
        }
      });
  }

  //________________________________Update progress__________________________

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
