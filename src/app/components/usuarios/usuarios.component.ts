import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from './usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  @ViewChild('signInForm') signInForm!: ElementRef;

  signin = true;
  signup = false;

  constructor(
    public usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  goRegister() {
    this.signin = false;
    this.signup = true;
  }

  goLogin() {
    this.signin = true;
    this.signup = false;
  }

  signIn(data: NgForm) {
    this.usuariosService.signIn(data.value).subscribe(
      (data) => {
        this.router.navigateByUrl('/productos');
      },
      (err) => {
        data.reset();
        alert(err.error.message);
        this.router.navigateByUrl('/usuarios');
      }
    );
  }

  createUsuarios(data: NgForm) {
    // pRobar si llega algo.
    //console.log(data.value);
    // Se llama el servicio y se le envía la data.value
    this.usuariosService.createUsuarios(data.value).subscribe(
      //Si todo esta bien, se redirije a productos
      (data) => {
        this.router.navigateByUrl('/productos');
      },
      // Si hay un error, se redirije a usuarios
      (err) => {
        data.reset();
        alert(err.error.message);
        this.router.navigateByUrl('/usuarios');
      }
    );
  }
}
