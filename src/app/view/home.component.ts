import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { TIPOUSUARIO } from '../model/usuario.model';
import { AuthService } from '../services/auth.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'uni7res-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: string
  senha: string
  emailEsqueci: string
  emailCadastro: string
  nomeCadastro: string
  msgCadastro: string

  msgTitulo: string
  msgDetalhe: string
  erroDetalhe: string;
  spinnerAutenticando: boolean

  constructor(private route: ActivatedRoute, private router: Router,
    private usuarioService: UsuarioService, private authService: AuthService) {
  }

  ngOnInit() {
    this.spinnerAutenticando = false
  }

  login() {
    this.spinnerAutenticando = true

    this.usuarioService.testeTeams('email@email', 'NOVO ALUNO', 'EQUIPE TESTE 1')
      .subscribe(response => {
        this.spinnerAutenticando = false
        if (response === undefined) {
          this.mostrarErro('Não foi possível inserir novo usuário.')
        }
        else if (response.status == 0) {
          this.mostraMsg('Cadastro realizado', 
          '<strong>E-mail: </strong>' + response.elemento.emailUNI7 +
          '<br/><strong>Senha: </strong>' + response.elemento.senhaUNI7 +
          '<br/><strong>Equipe: </strong>' + response.elemento.equipe
          )
        }
        else {
          this.mostrarErro(response.Detalhes)
        }
    });

/*
    this.usuarioService.autenticar(this.email, this.senha)
      .subscribe(response => {
        this.spinnerAutenticando = false
        if (response === undefined) {
          this.mostrarErro('Não foi possível realizar a autenticação. Verifique sua conexão com a Internet.')
        }
        else if (response.Status == 0) {
          this.authService.storeToken(response.Token)
          this.authService.storeUserId(response.UserID)
          this.authService.storeUsuario(response.Usuario)
          if (response.Usuario.Tipo as TIPOUSUARIO == TIPOUSUARIO.ADMIN) {
            this.router.navigate(['/principal/reservaadmin'], { relativeTo: this.route });
          }
          else {
            this.router.navigate(['/principal/reserva'], { relativeTo: this.route });
          }
        }
        else {
          this.mostrarErro(response.Detalhes)
        }
    });

    */
  }

  solicitarCadastro() {
    $('#modalCadastro').modal('hide')
    this.usuarioService.solicitarCadastro(this.emailCadastro, this.nomeCadastro, this.msgCadastro)
      .subscribe(response => {
        if (response === undefined) {
          this.mostrarErro('Não foi possível solicitar o seu cadastro. Verifique sua conexão com a Internet.')
        }
        else if (response.Status != 0) {
          this.mostrarErro(response.Detalhes)
        }
        else {
          this.mostraMsg('Solicitação de cadastro', response.Detalhes)
        }
    });
  }

  enviarNovaSenha() {
    $('#modalEsqueci').modal('hide')
    this.usuarioService.enviarNovaSenha(this.emailEsqueci)
      .subscribe(response => {
        if (response === undefined) {
          this.mostrarErro('Não foi possível realizar a requisição. Verifique sua conexão com a Internet.')
        }
        else if (response.Status != 0) {
          this.mostrarErro(response.Detalhes)
        }
        else {
          this.mostraMsg('Solicitação de senha', response.Detalhes)
        }
    });
  }

  mostraMsg(msgTitulo, msgDetalhe): void {
    this.msgTitulo = msgTitulo
    this.msgDetalhe = msgDetalhe
    $('#modalMsg').modal('show')
  }

  mostrarErro(detalhe): void {
    this.erroDetalhe = detalhe
    $('#modalErro').modal('show')
  }
}
