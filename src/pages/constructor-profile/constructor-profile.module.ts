import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConstructorProfilePage } from './constructor-profile';

@NgModule({
  declarations: [
    ConstructorProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ConstructorProfilePage),
  ],
})
export class ConstructorProfilePageModule {}
