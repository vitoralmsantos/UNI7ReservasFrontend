import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../services/auth.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'uni7res-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  nome: string
  email: string
  RA: string
  equipe: string

  msgTitulo: string
  msgDetalhe: string
  erroDetalhe: string;
  spinnerAutenticando: boolean

  public progress: number;
  public message: string;

  constructor(private route: ActivatedRoute, private router: Router,
    private usuarioService: UsuarioService, private authService: AuthService,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.spinnerAutenticando = false
    this.equipe = '0'
    this.nome = ''
    this.RA = ''
    this.email = ''
  }

  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    const uploadReq = new HttpRequest('POST', 
    `http://192.168.101.218:8084/api/values/upload`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
       if (event.type === HttpEventType.Response)
        this.message = JSON.parse(event.body.toString());

        
    });
  }

  cadastrar() {
    if (this.nome == ''){
      this.mostrarErro('Preencha o seu nome')
      return
    }

    if (this.email == ''){
      this.mostrarErro('Preencha o seu e-mail')
      return
    }

    if (this.equipe == '0'){
      this.mostrarErro('Escolha o seu curso')
      return
    }

    this.spinnerAutenticando = true

    this.usuarioService.cadastroIndividual(this.email, this.nome, this.RA, this.equipe)
      .subscribe(response => {
        this.spinnerAutenticando = false
        if (response === undefined) {
          this.mostrarErro('Não foi possível inserir novo usuário.')
        }
        else if (response.status == 0) {
          this.mostraMsg('Cadastro realizado', 
          '<strong>E-mail: </strong>' + response.elemento.ra +
          '<br/><strong>Senha: </strong>' + response.elemento.senha +
          '<br/><strong>Equipe: </strong>' + response.elemento.equipe
          )
        }
        else {
          this.mostrarErro(response.detalhes)
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
