import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';

// ADDED
class Photo {
  name: string;
  addedAt = '';
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: Photo[] = []; // ADDED

  constructor(private camera: Camera, private storage: Storage) { }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // Add new photo to gallery
      this.photos.unshift({
        name: new Date().toISOString(), // generate random name (timetstring is good random name)
        addedAt: new Date().toISOString(),
        data: 'data:image/jpeg;base64,' + imageData
      });

      this.storage.set('photos', this.photos); // TODO: Error Handler
    }, (err) => {
     // Handle error
     // TODO: Open Error Dialog or something
     console.log('Camera issue: ' + err);
    });
  }

  loadPhotos() {
    this.storage.get('photos').then((photos) => {
      this.photos = photos || [];
    });
  }
}
