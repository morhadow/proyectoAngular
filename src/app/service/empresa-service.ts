import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, httpOptions } from 'src/environments/environment';
import { IEmpresa, IPageEmpresa, IEmpresa2Send } from '../model/empresa-interfaces';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  constructor(private http: HttpClient) { }

  sURL = API_URL + '/empresa';

  getPage(
    rpp: number,
    page: number,
    filter: string,
    order: string,
    direction: string
  ): Observable<IPageEmpresa> {
    let strUrl: string = '';
    if (filter) {
      strUrl += '&filter=' + filter;
    }
    if (order) {
      strUrl += '&sort=' + order + ',' + direction;
    }
    return this.http.get<IPageEmpresa>(
      this.sURL + '/?page=' + (page - 1) + '&size=' + rpp + strUrl, httpOptions);
  }

  getOne(id: number): Observable<IEmpresa> {
    return this.http.get<IEmpresa>(this.sURL + '/' + id, httpOptions);
  }

  newOne(oEmpresa: IEmpresa2Send): Observable<IEmpresa> {
    return this.http.post<IEmpresa>(
      this.sURL + '/',
      oEmpresa,
      httpOptions
    );
  }

  updateOne(oEmpresa: IEmpresa2Send): Observable<IEmpresa> {
    return this.http.put<IEmpresa>(
      this.sURL + '/',
      oEmpresa,
      httpOptions
    );
  }

  removeOne(id: number): Observable<number> {
    return this.http.delete<number>(this.sURL + '/' + id, httpOptions);
  }
}