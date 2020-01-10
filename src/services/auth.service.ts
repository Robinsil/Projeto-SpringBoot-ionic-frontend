import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { APICONFIG } from "../config/api.config";
import { text } from "@angular/core/src/render3/instructions";

@Injectable()
export class AuthService{

    constructor(public http:HttpClient){
    }

    authenticate(creds : CredenciaisDTO){
       
       return this.http.post(`${APICONFIG.baseUrl}/login`,creds,
        {
            observe:'response',
            responseType:'text'

        })
    }

}