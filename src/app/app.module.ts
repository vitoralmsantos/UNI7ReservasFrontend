import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt');
import { AppRoutingModule } from './app-routing.module';

import { RootComponent } from './view/root.component';
import { HomeComponent } from './view/home.component';
import { PrincipalComponent } from './view/principal.component';
import { ReservaComponent } from './view/reserva.component';
import { ReservaAdminComponent } from './view/reservaadmin.component';
import { PerfilComponent } from './view/perfil.component';
import { UsuarioComponent } from './view/admin/usuario.component';
import { LocalComponent } from './view/admin/local.component';
import { EquipamentoComponent } from './view/admin/equipamento.component';
import { AdminComponent } from './view/admin/admin.component';
import { RelatorioReservasComponent } from './view/relatorios/relatorio-reservas.component';
import { RelatorioAvaliacaoComponent } from './view/relatorios/relatorio-avaliacao.component';
import { RelatoriosComponent } from './view/relatorios/relatorios.component';
import { CategoriaComponent } from './view/admin/categoria.component';
import { RecursoComponent } from './view/admin/recurso.component';
import { SairComponent } from './view/sair.component';

import { TeamsComponent } from './view/teams.component';

const appRoutes: Routes = [  
  { path: '', component: TeamsComponent},
  { path: 'principal', component: PrincipalComponent,
      children:[
        {path : 'sair', component: SairComponent},
        {path : 'reserva', component: ReservaComponent},
        {path : 'reservaadmin', component: ReservaAdminComponent},
        {path : 'perfil', component: PerfilComponent},
        {path : 'relatorios', component: RelatoriosComponent,
          children:[
            {path : 'reservas', component: RelatorioReservasComponent},
            {path : 'avaliacao', component: RelatorioAvaliacaoComponent}
          ]
        },
        {path : 'admin', component: AdminComponent,
          children:[
            {path : 'usuario', component: UsuarioComponent},
            {path : 'local', component: LocalComponent},
            {path : 'equipamento', component: EquipamentoComponent},
            {path: 'categoria', component: CategoriaComponent},
            {path: 'recurso', component: RecursoComponent}
          ]
        }
      ] 
  } 
];
  
@NgModule({
  declarations: [
    PrincipalComponent,
    HomeComponent,
    RootComponent,
    ReservaAdminComponent,
    ReservaComponent,
    PerfilComponent,
    UsuarioComponent,
    LocalComponent,
    EquipamentoComponent,
    AdminComponent,
    RelatorioReservasComponent,
    RelatorioAvaliacaoComponent,
    RelatoriosComponent,
    CategoriaComponent,
    RecursoComponent,
    SairComponent,

    TeamsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),  
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'pt' } ],
  bootstrap: [RootComponent]
})
export class AppModule { }
