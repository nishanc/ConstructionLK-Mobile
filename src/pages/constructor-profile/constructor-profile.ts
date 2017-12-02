import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the ConstructorProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-constructor-profile',
  templateUrl: 'constructor-profile.html',
})
export class ConstructorProfilePage {
  [x: string]: any;
  @ViewChild('fileInput') fileInput;
  isReadyToSave: boolean;
  item: any;
  form: FormGroup;
 
  constructor(public slideMenu: MenuController,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder,public camera: Camera) {
    this.ConstructorMenu="profile";
    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      about: ['']
    });
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
    this.slideMenu.swipeEnable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConstructorProfilePage');
  }
  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }
  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }
  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }
}
