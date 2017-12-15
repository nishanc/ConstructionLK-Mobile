import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private payPal :PayPal ) {
  }
  payment: PayPalPayment = new PayPalPayment('10.10', 'USD', 'TV', 'sale');
	currencies = ['EUR', 'USD'];
	payPalEnvironment: string = 'payPalEnvironmentSandbox';


	makePayment() {
		this.payPal.init({
			PayPalEnvironmentProduction: 'access_token$sandbox$736vkbym2nncty5y$630f0ecef772e0ac66f9ec9f193d1c1f',
			PayPalEnvironmentSandbox: ''
		}).then(() => {
			this.payPal.prepareToRender(this.payPalEnvironment, new PayPalConfiguration({})).then(() => {
				this.payPal.renderSinglePaymentUI(this.payment).then((response) => {
					alert(`Successfully paid. Status = ${response.response.state}`);
          console.log(response);
          alert(response);
				}, (error) => {
          console.error('Error or render dialog closed without being successful');
          alert(error);
				});
			}, (error) => {
        console.error('Error in configuration');
        alert(error);
			});
		}, (error) => {
      console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
      alert(error);
		});
	}

  

}
