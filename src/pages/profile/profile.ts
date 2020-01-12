import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { APICONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  
  cliente:ClienteDTO;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public storage:StorageService,
     public clieneteService:ClienteService

     ) {
  }

  ionViewDidLoad() {
   
    let localUser = this.storage.getLocalUser();

    if(localUser && localUser.email){
      this.clieneteService.findByEmail(localUser.email)
      .subscribe(response =>{

        this.cliente = response;
        this.getImageIfExists();
      },
      error =>{ })
    }
  }

  getImageIfExists(){
    this.clieneteService.getImageFromBucket(this.cliente.id)
    .subscribe(Response =>{
      this.cliente.imageUrl = `${APICONFIG.bucketbaseUrl}/cp${this.cliente.id}.jpg`;
    },error =>{  });
  }

}
