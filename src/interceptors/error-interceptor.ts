import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";



@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storage:StorageService, public alertCtrl:AlertController){
    }
    intercept(req:HttpRequest<any>, next: HttpHandler): Observable <HttpEvent<any>> {
       
        return next.handle(req)
        .catch((error,caught) => {

            let errorObj = error;

            if(errorObj.error){
                errorObj = errorObj.error;
            }

            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro dedectado pelo Interceptor");
            console.log(errorObj);

            switch(errorObj.status){

                case 401:
                    this.hadle401();
                    break;
                    
                case 403:
                    this.handle403();
                    break;
            }


            return Observable.throw(errorObj);
        })as any;
    }

    hadle401() {
        let alert = this.alertCtrl.create({

            title: 'Erro 401:Falha de Autenticaçao',
            message:'Email ou senha incorreto',
            enableBackdropDismiss:false,
            buttons:[
                {
                    text:"ok"
                }
            ]
        });
        alert.present();
    }

    handle403(){
         this.storage.setLocalUser(null);
    }



}

export const ErrorInterceptorProvider = {

    provide:HTTP_INTERCEPTORS,
    useClass:ErrorInterceptor,
    multi:true,

};