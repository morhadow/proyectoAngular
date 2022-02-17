import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IUserType } from 'src/app/model/tipousuario-interfaces';
import { TipousuarioService } from 'src/app/service/tipousuario-service';

declare let $: any;

@Component({
  selector: 'app-tipousuario-edit',
  templateUrl: './tipousuario-edit.html',
})
export class TipousuarioEditComponent implements OnInit {
  strEntity: string = 'tipousuario';
  strOperation: string = 'edit';
  strTitleSingular: string = 'Tipo de usuario';
  strTitlePlural: string = 'Tipos de usuario';
  oUserType: IUserType = null;
  oUserTypeToSend: IUserType = null;
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
    private oTipoUsuarioService: TipousuarioService,
    private oActivatedRoute: ActivatedRoute,
    private oLocation: Location,
  ) {
    if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem(
        'user',
        JSON.stringify(this.oRoute.snapshot.data.message)
      );
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.id = this.oActivatedRoute.snapshot.params.id;
    this.getOne();
  }

  ngOnInit(): void {}

  getOne = (): void => {
    this.oTipoUsuarioService.view(this.id).subscribe((oData: IUserType) => {
      this.oUserType = oData;
      this.oForm = this.oFormBuilder.group({
        id: [this.id],
        nombre: [
          this.oUserType.nombre,
          [Validators.required, Validators.minLength(4)],
        ],
      });
    });
  };

  onSubmit(): void {
    if (this.oForm) {
      this.oUserTypeToSend = {
        id: this.oForm.value.id,
        nombre: this.oForm.value.nombre,
      };
      this.update();
    }
  }

  update = (): void => {
    this.oTipoUsuarioService
      .edit(JSON.stringify(this.oUserTypeToSend))
      .subscribe((oCarritoPlist: IUserType) => {
        if (oCarritoPlist.id) {
          this.strResult = this.strTitleSingular + ' modificado correctamente';
        } else {
          this.strResult =
            this.strTitleSingular + ': error en la modificación del registro';
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