import { IUsuario } from '../../../../../model/usuario-interfaces';
import { IEmpresa, IPageEmpresa } from '../../../../../model/empresa-interfaces';
import { EmpresaService } from '../../../../../service/empresa-service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PaginationService } from 'src/app/service/pagination-service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-empresa-plist',
  templateUrl: './empresa-plist.html',
})
export class PlistEmpresaComponent implements OnInit {

  @Input() mode: boolean = true; //true=edición; false=selección
  @Output() selection = new EventEmitter<number>();
  //@ContentChild(TemplateRef) toolTemplate: TemplateRef<any>;
  
  strEntity: string = "empresa"
  strOperation: string = "plist"
  strTitleSingular: string = "Empresa";
  strTitlePlural: string = "Empresas";
  aEmpresas: IEmpresa[];
  aPaginationBar: string[];
  nTotalElements: number;
  TotalPages: number;
  page: number;
  pageSize: number = 10;
  strResult: string = null;
  strFilter: string = "";
  strSortField: string = "";
  strSortDirection: string = "";
  strFilteredMessage: string = "";
  oUserSession: IUsuario;
  subjectFiltro$ = new Subject();

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oEmpresaService: EmpresaService,
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
    this.subjectFiltro$
      .pipe(debounceTime(1000))
      .subscribe(() => this.getPage());
    this.page = 1;
    this.getPage();
  }

   getPage = () => {
    this.oEmpresaService
      .getPage(
        this.pageSize,
        this.page,
        this.strFilter,
        this.strSortField,
        this.strSortDirection
      )
      .subscribe((oPage: IPageEmpresa) => {
        if (this.strFilter) {
          this.strFilteredMessage = 'Listado filtrado por ' + this.strFilter;
        } else {
          this.strFilteredMessage = 'Listado NO filtrado';
        }
        this.aEmpresas = oPage.content;
        this.nTotalElements = oPage.totalElements;
        this.TotalPages = oPage.totalPages;
        this.aPaginationBar = this.oPaginationService.pagination(
          this.TotalPages,
          this.page
        );
        console.log(oPage);
      });
  };

  jumpToPage = () => {
    this.getPage();
    return false;
  }

  /*onKeyUpFilter(event: KeyboardEvent): void {
    this.subjectFiltro$.next();
  }*/

  doResetFilter() {
    this.strFilter = '';
    this.getPage();
  }

  doFilter() {
    this.getPage();
  }

  doResetOrder() {
    this.strSortField = "";
    this.strSortDirection = "";
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
    console.log('selection plist emite ' + id);
    this.selection.emit(id);
  }

}

