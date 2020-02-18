import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APICONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  findByCategoria(categoria_id : string) {
    return this.http.get(`${APICONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
  }

  getSmallImageFromBucket(id : string):Observable<any>{

    let url = `${APICONFIG.bucketbaseUrl}/prod${id}-small.jpg`
    return this.http.get(url,{responseType:'blob'});

  }
}