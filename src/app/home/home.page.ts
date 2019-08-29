import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public photoService: PhotoService) {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.photoService.loadPhotos();
  }
}
