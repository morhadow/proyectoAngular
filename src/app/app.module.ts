
import { PaginationService } from './service/pagination-service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/shared/routed/login/login';
import { HomeComponent } from './component/shared/routed/home/home';
import { LogoutComponent } from './component/shared/routed/logout/logout';
import { MenuComponent } from './component/shared/unrouted/menu/menu';
import { SessionService } from './service/session-service';
import { HttpClientModule } from '@angular/common/http';
import { SessionResolver } from './resolve/session-resolve';
import { TrimPipe } from './pipe/trim.pipe';
import { showDateTimePipe } from './pipe/showDateTime.pipe';
import { showBooleanPipe } from './pipe/showBoolean.pipe';
import { ModalComponent } from './component/shared/unrouted/modal/modal';
import { DateTimeService } from './service/datetime-service';
import { TipousuarioPlistComponent } from './component/application/routed/tipousuario/plist/tipousuario-plist';
import { TipousuarioEditComponent } from './component/application/routed/tipousuario/edit/tipousuario-edit';
import { TipousuarioViewComponent } from './component/application/routed/tipousuario/view/tipousuario-view';
import { UsuarioNewComponent } from './component/application/routed/usuario/new/usuario-new';
import { UsuarioEditComponent } from './component/application/routed/usuario/edit/usuario-edit';
import { UsuarioRemoveComponent } from './component/application/routed/usuario/remove/usuario-remove';
import { UsuarioViewComponent } from './component/application/routed/usuario/view/usuario-view';
import { UsuarioPlistComponent } from './component/application/routed/usuario/plist/usuario-plist';
import { ViewEmpresaComponent } from './component/application/routed/empresa/view/empresa-view';
import { NewEmpresaComponent } from './component/application/routed/empresa/new/empresa-new';
import { EditEmpresaComponent } from './component/application/routed/empresa/edit/empresa-edit';
import { RemoveEmpresaComponent } from './component/application/routed/empresa/remove/empresa-remove';
import { PlistEmpresaComponent } from './component/application/routed/empresa/plist/empresa-plist';
import { EmpresaService } from './service/empresa-service';
import { PaqueteService } from './service/paquete-service';
import { UsuarioService } from './service/usuario-service';
import { TipousuarioService } from './service/tipousuario-service';
import { GenerateComponent } from './component/shared/routed/generate/generate';
import { GenerateService } from './service/generate-service';
import { CountService } from './service/count-service';
import { PostService } from './service/post-service';
import { PopupComponent } from './component/shared/unrouted/popup/popup';
import { HeaderComponent } from './component/shared/unrouted/header/header';



@NgModule({
  declarations: [
    AppComponent,
    // shared unrouted
    ModalComponent,
    PopupComponent,
    MenuComponent,
    HeaderComponent,
    // shared routed
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    GenerateComponent,
    // pipes
    TrimPipe,
    showDateTimePipe,
    showBooleanPipe,
    // Tipousuario routed components
    TipousuarioPlistComponent,
    TipousuarioViewComponent,
    TipousuarioEditComponent,
    // Usuario routed components
    UsuarioPlistComponent,
    UsuarioViewComponent,
    UsuarioNewComponent,
    UsuarioEditComponent,
    UsuarioRemoveComponent,
    UsuarioPlistComponent,
    // Empresa routed components
    PlistEmpresaComponent,
    ViewEmpresaComponent,
    NewEmpresaComponent,
    EditEmpresaComponent,
    RemoveEmpresaComponent,
    // Paquete routed components
    /*PlistPaqueteComponent,
    NewPaqueteComponent,
    ViewPaqueteComponent,
    RemovePaqueteComponent,
    EditPaqueteComponent,*/
   

    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    SessionService,
    SessionResolver,
    PostService,
    PaginationService,
    DateTimeService,
    PaqueteService,
    EmpresaService,
    UsuarioService,
    TipousuarioService,
    GenerateService,
    CountService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
