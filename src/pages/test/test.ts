import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http ,Headers,RequestOptions} from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AbstractControlDirective } from '@angular/forms/src/directives/abstract_control_directive';




@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  Token: any;
  RealTok :any;
  users: Observable<any>;
  private FrmSignup : FormGroup
  
  public jobs:any;
  newsData : any;
  loading : any;
  
   constructor(public navCtrl: NavController,   
     public navParams: NavParams,    
     public loadingCtrl:LoadingController, 
     public http:Http ,
     private LoginFormBuilder:FormBuilder
     ) {

    this.loading = this.loadingCtrl.create({
      content:` <ion-spinner></ion-spinner>`
    });
    this.FrmSignup = this.LoginFormBuilder.group({
      txtFname:['',Validators.required],
      txtLname:['',Validators.required],
      txtEmail:['',Validators.compose([Validators.maxLength(30), Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])],
      txtMobile:['',Validators.compose([Validators.minLength(10),Validators.maxLength(10), Validators.required])],
      txtUsername:['',Validators.required],
      txtPassword:['',Validators.compose([Validators.minLength(10), Validators.required])],      
      txtAddress:['',Validators.required],
      txtDoB:['',Validators.required]
    });
  }
  onSubmit() { 
    //this.username = this.FrmSignup.controls['txtUsername']; 
    console.log(this.FrmSignup.value);   
  }   
  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }
  getTest(){
  //   var headers = new Headers();
  //   headers.append('Authorization','Bearer Veg37PVYad398oOCNJOqw23DL4wxsnrAeeQ1LyPX8ABt_nBqewreW0oI7x5PcgjCwez0DfhhZ1DSkQ0ImfxvD3GudLc2vLGLLFM_R79eDU5Gw7WWv8zGe4cTbU0t87a-qvhfxiNXf5ZSdBCdr8oG8p5OSFzJ92qu_-tFTVDWiPxRLDEFvrbMtLc-bUakxGFBGfHvbHWImCuFP7Fy51bNDMY1cZFGrPyVC_YGyEBo6McFs7rme-EmH2jF4wYpBLDzzS5NC2WPeTyezMhUIDzhyobbJAsag1RE5hsra5K0HjAYTz7Avw5LDXWuRT03OhWmoQQyO-vPOp0PhA8GJPCJG8X1vKfY8BtF3CY7-UA9OoLhTod6-cLnaB-F5rHjgLFKG-MgWF48G3PAr4UhsU4e2h_6q89q6cjeXkgZVWliXIc8BJ89E_AMXom5OdDS8pCKomUHtjKGIHIveQ9BcLC4rKKAS287FynMKUlhIbpeAHE');
  //   headers.append('Accept', 'application/json');
  //   this.http.get('http://localhost:50176/api/account/getprofile?id=101',{headers: headers}).subscribe (data => {
  //   console.log("Got Data",data);
      
  // });
  this.users = this.http.get('http://constructionlk.azurewebsites.net/api/customers/101');
  this.users.map(res => res.json()).subscribe(data=>{
    console.log('Address:',data);
  })
  
  }
 
  getTestInView(){
     this.http.get('https://jsonplaceholder.typicode.com/posts').map(res => res.json()).subscribe(data=>{
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
 
  getToken(){
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8'});
    headers.append('Accept', 'application/json');
    
    let options = new RequestOptions({headers:headers});
      let postParams ='username=NihanElephant@asadf.com&password=2@aAsdfsdfa&grant_type=password';
    this.http.post('http://constructionlkapi.azurewebsites.net/token',postParams,options).map(res => res.json())
    .subscribe(token=>{      
      this.Token = token.access_token;              
      console.log(this.Token);
      
      console.log(token.access_token);
   //   console.log( this.Token._body);
      // this.RealTok = this.Token._b.ody.access_token;
      // console.log( this.RealTok);
      //console.log( this.RealTok.access_token);
    },error =>{
      console.log(error);
    })
  }
  

}
