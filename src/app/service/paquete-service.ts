import { IPagePaquete } from './../model/paquete-interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { API_URL, environment, httpOptions } from 'src/environments/environment';


import { catchError, retry, shareReplay, tap } from 'rxjs/operators';
import { IPaquete, IPaqueteToSend } from '../model/paquete-interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  constructor(private http: HttpClient) { }

  sURL = API_URL + '/paquete';

  getPage(rpp: number, page: number, filter: string, order: string, direction: string, empresa: number, usuario: number): Observable<IPagePaquete> {
    page--;
    let strOrderUrl: string = "";
    if (filter) {
      strOrderUrl += "&filter=" + filter;
    }
    if (order) {
      strOrderUrl += "&sort=" + order + "," + direction;
    }
    if(empresa){
      strOrderUrl += "&empresa=" + empresa;
    }
    if(usuario){
      strOrderUrl += "&usuario=" + usuario;
    }
    console.log(this.sURL + "?page=" + page + "&size=" + rpp + strOrderUrl, httpOptions);
    return this.http.get<IPagePaquete>(this.sURL + "?page=" + page + "&size=" + rpp + strOrderUrl, httpOptions);
  }
  

  new(oPaquete: IPaqueteToSend): Observable<number> {
    return this.http.post<number>(this.sURL, oPaquete, httpOptions);
  }

  get(id: number): Observable<IPaquete> {
    return this.http.get<IPaquete>(this.sURL + "/" + id, httpOptions);
  }

  update(oPaqueteToSend: IPaqueteToSend): Observable<number> {
    return this.http.put<number>(this.sURL, oPaqueteToSend, httpOptions);
  }
  remove(id: number): Observable<number> {
    return this.http.delete<number>(this.sURL + "/" + id, httpOptions);
  }

}