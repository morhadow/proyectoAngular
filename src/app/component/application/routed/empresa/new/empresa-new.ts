import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IEmpresa, IEmpresa2Send } from 'src/app/model/empresa-interfaces';
import { EmpresaService } from 'src/app/service/empresa-service';
import { IUsuario } from 'src/app/model/usuario-interfaces';

declare let $: any;

@Component({
  selector: 'app-new-empresa',
  templateUrl: './empresa-new.html',
})

export class NewEmpresaComponent implements OnInit {


  strEntity: string = "Empresa"
  strOperation: string = "new"
  strTitleSingular: string = "Empresa";
  strTitlePlural: string = "Empresas";
  oEmpresa2Send: IEmpresa2Send = null;
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
    private oLocation: Location,
  ) {
    if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(): void {
    if (this.oForm) {
      this.oEmpresa2Send = {
        id: null,
        nombre: this.oForm.value.nombre,
        telefono: this.oForm.value.telefono,
        direccion: this.oForm.value.direccion,
        email: this.oForm.value.email

      };
      this.new();
    }
  }

  new = (): void => {
    this.oEmpresaService
      .newOne(this.oEmpresa2Send)
      .subscribe((oEmpresa: IEmpresa) => {
        if (oEmpresa.id) {
          this.id = oEmpresa.id;
          this.strResult = this.strTitleSingular + ' creada correctamente con id=' + oEmpresa.id;
        } else {
          this.strResult = this.strTitleSingular + ': error en la creación del registro';
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
