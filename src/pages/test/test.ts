import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

//import { LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  Token: any;
  RealTok: any;
  users: Observable<any>;
  private FrmSignup: FormGroup

  public jobs: any;
  newsData: any;
  loading: any;
  UserData : any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public http: Http,
    private LoginFormBuilder: FormBuilder,
    public storage: Storage
  ) {

   
    this.FrmSignup = this.LoginFormBuilder.group({
      txtFname: ['', Validators.required],
      txtLname: ['', Validators.required],
      txtEmail: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
      txtMobile: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.required])],
      txtUsername: ['', Validators.required],
      txtPassword: ['', Validators.compose([Validators.minLength(10), Validators.required])],
      txtAddress: ['', Validators.required],
      txtDoB: ['', Validators.required]
    });
  }
  onSubmit() {
    //this.username = this.FrmSignup.controls['txtUsername']; 
    console.log(this.FrmSignup.value);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }
  getTest() {
    let loading = this.loadingController.create({content : "Logging in ,please wait..."});
    loading.present();
      var headers = new Headers();
      headers.append('Authorization','Bearer vcWMM9APrGQ09sqlfQTuyR76u4emqhYT0BKDgjCxG4ZN_LMPyaRP8H4LayLY_O2ilXoa3kCSygn73CWzRd84KkyLjlqvgZ_osvQy9RDBa3XrQovYdftLQu_hEFCZRKJQivnqm-DX9Wu2SB3eIxLnuCtthIDHi0nzgS40wJsqt-LwhkiJmKxQYpO0oVWoZQyu4B6jwliPhNcrPRqrYfmS7K7S3ZxdbCI2Uv7Nh-rgViYGwaArRD3V7qFN0bRx5ypgfft-d4M6CTdRYyv0d6V8_O6jFnz25IF_xIz6M3uZu6Q02IRthGQSS04BxRCHC3sJQUk9TgxYDGsHRizHOi6TSIzsdclMYm091RxRrM0Dta6lgOLgXeLRPAy8UUCkGsuahyGkwF3xXyQOuEjEVHNAE0Gzyf7sm3aGSBsz80yHL1xTngIJokOG1AbJMwKk1HY8pcwBPj6oedXc8h8laCO8sRcqmTeD-TmA72jHmIpJF0m6nJMVBjS8UN6CyST5BgkDeCR84CCzJw2DJqpBPdLiNt5nhhJiuxWKJ21MlEi05RA');
      headers.append('Accept', 'application/json');
      this.http.get('http://constructionlkapi.azurewebsites.net/customer/GetCustomerProfile',{headers: headers}).map(res => res.json()).
      subscribe (data => {
      this.UserData = data;
      console.log("Got Data",this.UserData.Address);
      loading.dismissAll();
    });
    // this.users = this.http.get('http://constructionlk.azurewebsites.net/api/customers/101');
    // this.users.map(res => res.json()).subscribe(data => {
    //   console.log('Address:', data);
    // })

  }
  

  getTestInView() {
    this.http.get('https://jsonplaceholder.typicode.com/posts').map(res => res.json()).subscribe(data => {
      this.newsData = data;
      // console.log(data['_body']);
      //console.log(this.newsData);
      console.log(this.newsData[0].id);
      //this.jobs = data;


    })

    // this.redditService.getRemoteData().subscribe(data => {   

    //        this.jobs = data;
    //        console.log(this.jobs);
    //     });
  }
  //__________________________________________Token_________________________
  getToken() {

    // this.storage.get('StoredToken').then((val) => {
    //   console.log('Stored token is', val);
    // });
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    headers.append('Accept', 'application/json');

    let options = new RequestOptions({ headers: headers });
    let postParams = 'username=NihanElephant@asadf.com&password=2@aAsdfsdfa&grant_type=password';
    this.http.post('http://constructionlkapi.azurewebsites.net/token', postParams, options).map(res => res.json())
      .subscribe(token => {
        this.Token = token.access_token;              
        console.log(this.Token);
        this.storage.set('StoredToken', this.Token);
        //this.getLoginUserData(this.Token);
      }, error => {
        console.log(error);
      })
  }
  getLoginUserData(Token :String){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get("http://constructionlkapi.azurewebsites.net/customer/GetCustomerProfile").map(res => res.json()) 
  }

}
