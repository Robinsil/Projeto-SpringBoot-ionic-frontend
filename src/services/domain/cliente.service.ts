import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { APICONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ClienteService{

   constructor(public http:HttpClient,public storage : StorageService){
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
}
