import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgressUpdatePage } from './progress-update';

@NgModule({
  declarations: [
    ProgressUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(ProgressUpdatePage),
  ],
})
export class ProgressUpdatePageModule {}
