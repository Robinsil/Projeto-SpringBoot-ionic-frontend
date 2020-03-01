import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APICONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  findById(produto_id :string){
    return this.http.get<ProdutoDTO>(`${APICONFIG.baseUrl}/produtos/${produto_id}`);
  }

  findByCategoria(categoria_id : string, page : number = 0, linesPages : number = 24) {
    return this.http.get(`${APICONFIG.baseUrl}/produtos/?categorias=${categoria_id}&page=${page}&linesPages=${linesPages}`);
  }

  getSmallImageFromBucket(id : string):Observable<any>{
    let url = `${APICONFIG.bucketbaseUrl}/prod${id}-small.jpg`
    return this.http.get(url,{responseType:'blob'});

  }

  getImageFromBucket(id : string):Observable<any>{
    let url = `${APICONFIG.bucketbaseUrl}/prod${id}.jpg`
    return this.http.get(url,{responseType:'blob'});

  }
}