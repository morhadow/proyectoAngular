import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {  ITipoUsuarioPage,  IUserTypePlist,} from 'src/app/model/tipousuario-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { PaginationService } from 'src/app/service/pagination-service';
import { TipousuarioService } from 'src/app/service/tipousuario-service';

@Component({
  selector: 'app-tipousuario-plist',
  templateUrl: './tipousuario-plist.html',
})
export class TipousuarioPlistComponent implements OnInit {

  @Input() id_usuario: number = null;
  @Input() mode: boolean = true; 
  @Output() selection = new EventEmitter<number>();
  
  strEntity: string = 'tipousuario';
  strOperation: string = 'plist';
  strTitleSingular: string = 'Tipo de usuario';
  strTitlePlural: string = 'Tipos de usuario';
  aTipoUsuarios: IUserTypePlist[];
  aPaginationBar: string[];
  nTotalElements: number;
  nTotalPages: number;
  nPage: number;
  nPageSize: number = 10;
  strResult: string = null;
  strFilter: string = '';
  strSortField: string = '';
  strSortDirection: string = '';
  strFilteredMessage: string = '';
  oUserSession: IUsuario;
  subjectFiltro$ = new Subject();

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oTipoUsuarioService: TipousuarioService,

    
  )

  
 
  {
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
  }
  
  getPage = () => {
    console.log('buscando...', this.strFilter);
    this.oTipoUsuarioService
      .getPage(
        this.nPageSize,
        this.nPage,
        this.strFilter,
        this.strSortField,
        this.strSortDirection
      )
      .subscribe((oPage: ITipoUsuarioPage) => {
        if (this.strFilter) {
          this.strFilteredMessage = 'Listado filtrado: ' + this.strFilter;
        } else {
          this.strFilteredMessage = '';
        }
        this.aTipoUsuarios = oPage.content;
        this.nTotalElements = oPage.totalElements;
        this.nTotalPages = oPage.totalPages;
        this.aPaginationBar = this.oPaginationService.pagination(
          this.nTotalPages,
          this.nPage
        );
      });
  };

  jumpToPage = () => {
    this.getPage();
    return false;
  };

  doResetOrder() {
    this.strSortField = '';
    this.strSortDirection = '';
    this.getPage();
  }

  doSetOrder(order: string) {
    this.strSortField = order;
    if (this.strSortDirection == 'asc') {
      this.strSortDirection = 'desc';
    } else if (this.strSortDirection == 'desc') {
      this.strSortDirection = '';
    } else {
      this.strSortDirection = 'asc';
    }
    this.getPage();
  }

  onSelection(id: number) {
    console.log("selection plist emite " + id);
    this.selection.emit(id);
  }

  ngOnInit(): void {
    this.subjectFiltro$
      .pipe(debounceTime(1000))
      .subscribe(() => this.getPage());
  }

  
}