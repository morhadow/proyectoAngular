import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmpresa } from 'src/app/model/empresa-interfaces';
import { EmpresaService } from 'src/app/service/empresa-service';
import { Location } from '@angular/common';
import { IUsuario } from 'src/app/model/usuario-interfaces';

@Component({
  selector: 'app-view-empresa',
  templateUrl: './empresa-view.html',
})
export class ViewEmpresaComponent implements OnInit {

  strEntity: string = "empresa"
  strOperation: string = "view"
  strTitleSingular: string = "Empresa";
  strTitlePlural: string = "Empresas";
  id: number = 0;
  oEmpresa: IEmpresa;
  oUserSession: IUsuario;

  constructor(
    private oEmpresaService: EmpresaService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oLocation: Location,
  ) {
    if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.id = this.oActivatedRoute.snapshot.params.id;
    this.getOne();
  }

  ngOnInit(): void { }

  getOne = () => {
    this.oEmpresaService
      .getOne(this.id)
      .subscribe((oData: IEmpresa) => {
        this.oEmpresa = oData;
      });
  };

  goBack() {
    this.oLocation.back();
  }
}