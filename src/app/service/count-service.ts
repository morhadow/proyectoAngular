
  
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, httpOptions } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})


export class CountService {
  constructor(private http: HttpClient) { }

  

  getCountUsuarios(): Observable<number> {
    return this.http.get<number>(API_URL + '/usuario/count', httpOptions);
  }

  getCountTiposUsuario(): Observable<number> {
    return this.http.get<number>(API_URL + '/tipousuario/count', httpOptions);
  }

  getCountEmpresas(): Observable<number> {
    return this.http.get<number>(API_URL + '/empresa/count', httpOptions);
  }

  getCountPaquetes(): Observable<number> {
    return this.http.get<number>(API_URL + '/paquete/count', httpOptions);
  }



}