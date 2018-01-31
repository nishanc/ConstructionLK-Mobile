import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { Stripe } from '@ionic-native/stripe';
import { TestPage } from '../test/test';
/**
 * Generated class for the PaymentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage {
  private serviceId: any;
	private stripeToken : any;
	private FrmPayment = {};
  private cardDetails;
  masks: any;
  number: any = "";
  constructor(
    public navCtrl: NavController, 
		public navParams: NavParams,
    private stripe: Stripe,
    public loadingCtrl: LoadingController,) {
      this.serviceId = this.navParams.get('id');
  }
  // getPaymentData(){
  //   var token = this.logForm();
  //   alert(token);
  //   var id = this.serviceId;
  //   var stripeToken = this.stripeToken;
  //   let data = {
  //     id : this.serviceId,
  //     stripeToken : this.stripeToken
  //   }
  //   if(this.stripeToken)
  //     this.navCtrl.push(TestPage,{data:data});
  // }
	
  public logForm() : any {
   
		console.log(this.FrmPayment);
		this.cardDetails = this.FrmPayment;
		this.stripe.setPublishableKey('pk_test_TT4ubjaV0kCwQegylRxCUjkO');
    
   
    this.stripe.createCardToken(this.cardDetails).then(token =>       
      this.stripeToken = token.id
      
      ).catch(error => 
        alert("Error : "+error)
      );
      //alert('token'+this.stripeToken);
      
      let loading = this.loadingCtrl.create({content : "Updating..."});
      loading.present();
      setTimeout( () => { 
        if(this.stripeToken){
          //alert(this.stripeToken);
          let data = {
                id : this.serviceId,
                stripeToken : this.stripeToken
          }
          var token = this.stripeToken;
          
          
          this.navCtrl.push(TestPage,{ token:token });
        }
           loading.dismissAll();
         }, 6000);
         

         
      }
       
  

}
