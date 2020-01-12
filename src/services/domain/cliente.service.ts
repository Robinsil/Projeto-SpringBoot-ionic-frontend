import { HttpClient,  HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { APICONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ClienteService{

   constructor(public http:HttpClient,public storage : StorageService){
   }

   findByEmail(email:string):Observable <ClienteDTO>{

     let token =  this.storage.getLocalUser().token;
     let authHeader = new HttpHeaders({'Authorization':'Bearer '+token});
     return this.http.get<ClienteDTO>(`${APICONFIG.baseUrl}/clientes/email?value=${email}`,
     {'headers': authHeader} );

   }

   getImageFromBucket(id:string):Observable<any>{

     let url = `${APICONFIG.bucketbaseUrl}/cp${id}.jpg`
     return this.http.get(url,{responseType : 'blob'});

   }
}