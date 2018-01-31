import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickLocationPage } from './pick-location';

@NgModule({
  declarations: [
    PickLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(PickLocationPage),
  ],
})
export class PickLocationPageModule {}
