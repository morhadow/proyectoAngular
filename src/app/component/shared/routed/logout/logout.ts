import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/service/session-service';
import { Location } from '@angular/common';
import { IUsuario } from 'src/app/model/usuario-interfaces';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.html',
})
export class LogoutComponent implements OnInit {
  
  strOperation: string = "logout"
  oUserSession: IUsuario;

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oSessionService: SessionService,
    private _location: Location,
  ) {

    if (this.oRoute.snapshot.data['message']) {
      this.oUserSession = this.oRoute.snapshot.data['message'];
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data['message']));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

  }

  public closeSession() {
    this.oSessionService.logout().subscribe(data => {
      localStorage.clear();
      this.oRouter.navigate(['/home']);
    });
  }

  ngOnInit(): void {
  }

  goBack() {
    this._location.back();
  }
}
