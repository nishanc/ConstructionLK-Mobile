import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgressReviewPage } from './progress-review';

@NgModule({
  declarations: [
    ProgressReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgressReviewPage),
  ],
})
export class ProgressReviewPageModule {}
