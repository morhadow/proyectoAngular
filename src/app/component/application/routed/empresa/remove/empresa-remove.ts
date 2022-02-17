import { IEmpresa } from '../../../../../model/empresa-interfaces';
import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/service/empresa-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IUsuario } from 'src/app/model/usuario-interfaces';

@Component({
  selector: 'app-remove-empresa',
  templateUrl: './empresa-remove.html',
})
export class RemoveEmpresaComponent implements OnInit {

  strEntity: string = "Empresa"
  strOperation: string = "remove"
  strTitleSingular: string = "Empresa";
  strTitlePlural: string = "Empresas";
  id: number = 0;
  oEmpresa: IEmpresa;
  oUserSession: IUsuario;
  strResult: string = null;

  constructor(
    private oEmpresaService: EmpresaService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private _location: Location,
  ) {
    if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.id = this.oActivatedRoute.snapshot.params['id'];
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

  removeOne() {
    this.oEmpresaService.removeOne(this.id).subscribe((data: number) => {
      if (data) {
        this.strResult = this.strTitleSingular + ' con ID=' + this.id + ' ha sido borrado con éxito';
      } else {
        this.strResult = 'Error en el borrado de ' + this.strTitleSingular;
      }
      this.openPopup();
    });
  }

  goBack() {
    this._location.back();
  }

  //popup

  eventsSubjectShowPopup: Subject<void> = new Subject<void>();

  openPopup(): void {
    this.eventsSubjectShowPopup.next();
  }

  onClosePopup(): void {
    this.oRouter.navigate([this.strEntity + '/view/' + this.id]);
  }
}
