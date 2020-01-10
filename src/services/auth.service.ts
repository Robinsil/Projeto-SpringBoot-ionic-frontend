import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { APICONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";


@Injectable()
export class AuthService{

    constructor(public http:HttpClient,public storage : StorageService){
    }

    authenticate(creds : CredenciaisDTO){
       
       return this.http.post(`${APICONFIG.baseUrl}/login`,creds,
        {
            observe:'response',
            responseType:'text'

        })
    }

    succeessfulLogin(authorizationValue : string){

        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token:tok
        };
        this.storage.setLocalUser(user);
        
    }

    logout(){
        this.storage.setLocalUser(null);
    }

}