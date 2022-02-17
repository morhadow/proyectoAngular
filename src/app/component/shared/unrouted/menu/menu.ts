import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUsuario } from 'src/app/model/usuario-interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
})
export class MenuComponent implements OnInit {

  oUsuarioSession: IUsuario;
  strUrl: String = "";
 


  constructor(
    private router: Router,
    

  ) {

    this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.strUrl = ev.url;
      }
    })

  }

  ngOnInit(): void {
  }

  

  

}