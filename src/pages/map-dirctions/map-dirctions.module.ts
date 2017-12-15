import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapDirctionsPage } from './map-dirctions';

@NgModule({
  declarations: [
    MapDirctionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MapDirctionsPage),
  ],
})
export class MapDirctionsPageModule {}
