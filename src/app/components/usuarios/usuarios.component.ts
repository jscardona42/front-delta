import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from './usuarios.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

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
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  goRegister() {
    this.signin = false;
    this.signup = true;
  }

  goLogin() {
    this.signin = true;
    this.signup = false;
  }

  signIn(form: NgForm) {
    if (!form.valid) {
      this.toastr.error('No deje campos en blanco');
    } else {
      this.usuariosService.signIn(form.value).subscribe(
        (data) => {
          localStorage.setItem("token", JSON.stringify(data.token));
          this.router.navigateByUrl('/productos');
        },
        (err) => {
          form.reset();
          swal.fire('Error', err.error.message, 'error');
          this.router.navigateByUrl('/usuarios');
        }
      );
    }
  }

  createUsuarios(form: NgForm) {
    if (!form.valid) {
      this.toastr.error('No deje campos en blanco');
    } else {
      // Se llama el servicio y se le envía la form.value
      this.usuariosService.createUsuarios(form.value).subscribe(
        (data) => {
          this.toastr.success('Inicie sesión para continuar!', 'Registrado correctamente');
          this.router.navigateByUrl('/usuarios');
          this.goLogin();
        },
        // Si hay un error, se redirije a usuarios
        (err) => {
          form.reset();
          swal.fire('Error', err.error.message, 'error');
          this.router.navigateByUrl('/usuarios');
        }
      );
    }

  }
}
