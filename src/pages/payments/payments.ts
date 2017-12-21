import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { Stripe } from '@ionic-native/stripe';
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
	
	private FrmPayment = {};
	private cardDetails;
  constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		private stripe: Stripe) {
  }
 
	
  logForm() {
		console.log(this.FrmPayment);
		this.cardDetails = this.FrmPayment;
		this.stripe.setPublishableKey('pk_test_MVIAc9x0Br5Cn7KG9gToSIMn');
    
   
    this.stripe.createCardToken(this.cardDetails)
       .then(token => alert(token.id))
       .catch(error => alert("My error "+error));
  }

  

}
