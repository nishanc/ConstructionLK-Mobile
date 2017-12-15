import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController } from 'ionic-angular';
import { FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { RequestOptions, Headers, Http } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage implements OnInit {
 
  RegDetails: any;
  private FrmSignup: FormGroup;
 

  constructor(public slideMenu: MenuController,
    public navCtrl: NavController,
    public http: Http,
    private alertCtrl: AlertController,) {

  }
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      let input = control.value;

      let isValid = control.root.value[field_name] == input
      if (!isValid)
        return { 'equalTo': { isValid } }
      else
        return null;
    };
  }
  ngOnInit() {
    this.FrmSignup = new FormGroup({

      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      Username: new FormControl('', [Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])]),
      Password: new FormControl('', Validators.compose([Validators.minLength(8), Validators.required])),
      ConfirmPassword: new FormControl('', [Validators.required, this.equalto('Password')]),
      Address: new FormControl('', [Validators.required]),
      Gender: new FormControl('', [Validators.required]),
      Telephone: new FormControl('', Validators.compose([Validators.minLength(10), Validators.required])),
      DOB: new FormControl('', [Validators.required])
      
    });

  }
  logForm() {

  }
  postSignup() {
    console.log(this.FrmSignup.value);

    var headers = new Headers();
    headers.append("Accept", 'application/json');

    let options = new RequestOptions({ headers: headers });    
    this.RegDetails=this.FrmSignup.value;
    this.RegDetails.Subcribe=true;
    let postParams =  this.RegDetails;
    console.log(this.RegDetails);
    this.http.post('http://constructionlkapi.azurewebsites.net/api/account/register', postParams, options)
      .subscribe(data => {
        alert("Registration succesfull");
        console.log("Registration succesfull");
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: error._body,
          buttons: ['OK']
        });
        alert.present();
        console.log(error);
      })
  }



}
