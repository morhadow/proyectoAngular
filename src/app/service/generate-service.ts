import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, httpOptions } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})


export class GenerateService {
  constructor(private http: HttpClient) { }  

 

  generateUsuarios(n: number): Observable<number> {
    return this.http.post<number>(API_URL + '/usuario/generate/' + n, { amount: n }, httpOptions);
  }

  generateTiposDeUsuario(): Observable<number> {
    return this.http.post<number>(API_URL + '/tipousuario/generate', "", httpOptions);
  }


  generateEmpresas(n: number): Observable<number> {
    return this.http.post<number>(API_URL + '/empresa/generate/' + n, { amount: n }, httpOptions);
  }

  generatePaquetes(n: number): Observable<number> {
    return this.http.post<number>(API_URL + '/paquete/generate/' + n, { amount: n }, httpOptions);
  }

  
}