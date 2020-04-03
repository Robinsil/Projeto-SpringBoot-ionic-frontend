import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { APICONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Injectable } from "@angular/core";
import { ImageUtilService } from "../image-util-service";

@Injectable()
export class ClienteService{

   constructor(
     public http:HttpClient,
     public storage : StorageService,
     public imageUtilService: ImageUtilService){
   }
   

   findByEmail(email: string)  {
    return this.http.get(`${APICONFIG.baseUrl}/clientes/email?value=${email}`);
 }

   getImageFromBucket(id:string):Observable<any>{

     let url = `${APICONFIG.bucketbaseUrl}/cp${id}.jpg`
     return this.http.get(url,{responseType : 'blob'});

   }

  insert(obj : ClienteDTO) {
    return this.http.post(
      `${APICONFIG.baseUrl}/clientes`, 
        obj,
        { 
          observe: 'response', 
          responseType: 'text'
          }
      ); 
  }
 
  findById(id: string)  {
    return this.http.get(`${APICONFIG.baseUrl}/clientes/${id}`);
  }
  uploadPicture(picture) {
    let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
    let formData : FormData = new FormData();
    formData.set('file', pictureBlob, 'file.png');
    return this.http.post(
        `${APICONFIG.baseUrl}/clientes/picture`, 
        formData,
        { 
            observe: 'response', 
            responseType: 'text'
        }
    ); 
}
}
