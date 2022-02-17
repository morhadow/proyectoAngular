import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IEmpresa, IEmpresa2Send } from 'src/app/model/empresa-interfaces';
import { EmpresaService } from 'src/app/service/empresa-service';
import { IUsuario } from 'src/app/model/usuario-interfaces';


declare let $: any;

@Component({
  selector: 'app-edit-empresa',
  templateUrl: './empresa-edit.html',
})
export class EditEmpresaComponent implements OnInit {

  strEntity: string = "empresa"
  strOperation: string = "edit"
  strTitleSingular: string = "Empresa";
  strTitlePlural: string = "Empresas";
  oEmpresa2Send: IEmpresa2Send = null;
  oEmpresa2Show: IEmpresa = null;
  id: number = null;
  oForm: FormGroup = null;
  strResult: string = null;
  oUserSession: IUsuario;

  get f() {
    return this.oForm.controls;
  }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oEmpresaService: EmpresaService,
    private oActivatedRoute: ActivatedRoute,
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

  getOne = (): void => {
    this.oEmpresaService
      .getOne(this.id)
      .subscribe((oData: IEmpresa) => {
        this.oEmpresa2Show = oData;
        this.oForm = this.oFormBuilder.group({
          id: [this.oEmpresa2Show.id],
          nombre: [this.oEmpresa2Show.nombre,[Validators.required, Validators.minLength(5)]],
          telefono: [this.oEmpresa2Show.telefono,[Validators.required, Validators.minLength(9)]],
          direccion: [this.oEmpresa2Show.direccion,[Validators.required, Validators.minLength(5)]],
          email: [this.oEmpresa2Show.email,[Validators.required, Validators.minLength(5)]],
          
        });
      });
  };

  onSubmit(): void {
    if (this.oForm) {
      this.oEmpresa2Send = {
        id: this.oForm.value.id,
        nombre: this.oForm.value.nombre,
        telefono: this.oForm.value.telefono,
        direccion: this.oForm.value.direccion,
        email: this.oForm.value.email

      };
      this.update();
    }
  }

  update = (): void => {
    this.oEmpresaService
      .updateOne(this.oEmpresa2Send)
      .subscribe((oEmpresa: IEmpresa) => {
        if (oEmpresa.id) {
          this.strResult = this.strTitleSingular + ' modificada correctamente';
        } else {
          this.strResult = this.strTitleSingular + ': error en la modificación del registro';
        }
        this.openPopup();
      });
  };

  goBack(): void {
    this.oLocation.back();
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
