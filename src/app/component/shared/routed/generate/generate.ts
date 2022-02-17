  
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { GenerateService } from 'src/app/service/generate-service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { CountService } from 'src/app/service/count-service';

@Component({
  selector: 'app-randomload',
  templateUrl: './generate.html',
})
export class GenerateComponent implements OnInit {

  oUserSession: IUsuario;
  nUsuarios: number = 0;
  nTiposDeUsuario: number = 0;
  nEmpresas: number = 0;
  nPaquetes: number = 0;
  strResult: string = "";
  bLoading:boolean=false;

  constructor(
    public oGenerateService: GenerateService,
    public oCountService: CountService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oLocation: Location,
  ) {
    if (this.oRoute.snapshot.data['message']) {
      this.oUserSession = this.oRoute.snapshot.data['message'];
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data['message']));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.getCount();
  }

  ngOnInit(): void { }

  getCount(): void {
    this.bLoading=true;
    this.oCountService.getCountEmpresas().subscribe((n: number) => this.nEmpresas = n);
    this.oCountService.getCountPaquetes().subscribe((n: number) => this.nPaquetes = n);
    this.oCountService.getCountUsuarios().subscribe((n: number) => this.nUsuarios = n);
    this.oCountService.getCountTiposUsuario().subscribe((n: number) => this.nTiposDeUsuario = n);
    this.bLoading=false;
  }

  goBack() {
    this.oLocation.back();
  }

  generateEmpresas(n: number): void {
    this.bLoading=true;
    this.oGenerateService.generateEmpresas(n).subscribe(
      (num: number) => {
        this.strResult = "Ahora hay " + num + " empresas";
        this.bLoading=false;
        this.openModal();
      },
      err => {
        this.strResult = "ERROR: " + err.message;
        console.error('ERROR: ', err);
        this.bLoading=false;
        this.openModal();
      })
  }

  generateUsuarios(n: number): void {
    this.bLoading=true;
    this.oGenerateService.generateUsuarios(n).subscribe(
      (num: number) => {
        this.strResult = "Ahora hay " + num + " usuarios";
        this.bLoading=false;
        this.openModal();
      },
      err => {
        this.strResult = "ERROR: " + err.message;
        console.error('ERROR: ', err);
        this.bLoading=false;
        this.openModal();
      })
  }

  generateTiposDeUsuario() {
    this.bLoading=true;
    this.oGenerateService.generateTiposDeUsuario().subscribe(
      (num: number) => {
        this.strResult = "Ahora hay " + num + " tipos de usuario";
        this.bLoading=false;
        this.openModal();
      },
      err => {
        this.strResult = "ERROR: " + err.message;
        console.error('ERROR: ', err);
        this.bLoading=false;
        this.openModal();
      })
  }

  generatePaquetes(n: number) {
    this.bLoading=true;
    this.oGenerateService.generatePaquetes(n).subscribe(
      (num: number) => {
        this.strResult = "Ahora hay " + num + " paquetes";
        this.bLoading=false;
        this.openModal();
      },
      err => {
        this.strResult = "ERROR: " + err.message;
        console.error('ERROR: ', err);
        this.bLoading=false;
        this.openModal();
      })
  }




  //modal 

  eventsModalSubject: Subject<void> = new Subject<void>();

  openModal() {
    this.eventsModalSubject.next();
  }

  onCloseModal() {
    this.getCount();
    this.strResult = "";
  }

}