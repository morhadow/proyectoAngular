import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPage, IPost } from 'src/app/model/model-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { PaginationService } from 'src/app/service/pagination-service';
import { PostService } from 'src/app/service/post-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
})

export class HomeComponent implements OnInit {

  
  usuarioSession: IUsuario = null;
  tipousuarioSession_id:number=null;
  

  constructor(
    private oRoute: ActivatedRoute,
    private oActivatedRoute: ActivatedRoute,
    private oPaginationService: PaginationService,
    private oPostService: PostService,
  ) {



    if (this.oRoute.snapshot.data['message']) {
      this.usuarioSession = this.oRoute.snapshot.data['message'];
      this.tipousuarioSession_id=this.usuarioSession.tipousuario.id;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data['message']));
    } else {
      localStorage.clear();
    }

    

  }



  ngOnInit(): void {
  }


}