import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUserType } from 'src/app/model/tipousuario-interfaces';
import { TipousuarioService } from 'src/app/service/tipousuario-service';

@Component({
  selector: 'app-tipousuario-view-routed',
  templateUrl: './tipousuario-view.html',
})
export class TipousuarioViewComponent implements OnInit {
  public tipoUsuario: IUserType;
  strEntity: string = 'tipousuario';
  strOperation: string = 'view';
  strTitleSingular: string = 'Tipo de Usuario';
  strTitlePlural: string = 'Tipos de Usuario';

  constructor(
    private tipoUsuarioService: TipousuarioService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.tipoUsuarioService
      .view(this.activatedRoute.snapshot.params.id)
      .subscribe((data: IUserType) => {
        this.tipoUsuario = data;
      });
  }

  ngOnInit(): void {}

  goBack(): void {
    this.tipoUsuarioService.redirectPlist();
  }
}