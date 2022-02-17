import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsuarioService } from 'src/app/service/usuario-service';
import { IUsuario } from 'src/app/model/usuario-interfaces';

@Component({
  selector: 'app-usuario-view',
  templateUrl: './usuario-view.html',
})

export class UsuarioViewComponent implements OnInit {
  
  id: number;
  strUsuarioSession: string;
  strEntity: string = "usuario"
  strOperation: string = "view"
  strTitleSingular:string= "usuario"
  oUsuario: IUsuario;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oLocation: Location,
    private oUsuarioService: UsuarioService,


  ) {
    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.id = this.oActivatedRoute.snapshot.params.id;    
  }

  ngOnInit(): void {
    this.getOne();
  }

  getOne = () => {
    this.oUsuarioService
      .getOne(this.id)
      .subscribe((oData: IUsuario) => {
        this.oUsuario = oData;
      });
  };

  goBack() {
    this.oLocation.back();
  }
}
