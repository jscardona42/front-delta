import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from './usuarios.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  @ViewChild('signInForm') signInForm!: ElementRef;
  faCooffe = faCertificate;

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

  signIn(data: NgForm) {
    if (!data.valid) {
      this.toastr.error('No deje campos en blanco');
    } else {
      this.usuariosService.signIn(data.value).subscribe(
        (data) => {
          localStorage.setItem("token", JSON.stringify(data.token));
          this.router.navigateByUrl('/productos');
        },
        (err) => {
          data.reset();
          swal.fire('Error', err.error.message, 'error');
          this.router.navigateByUrl('/usuarios');
        }
      );
    }
  }

  createUsuarios(data: NgForm) {
    if (!data.valid) {
      this.toastr.error('No deje campos en blanco');
    } else {
      // Se llama el servicio y se le envía la data.value
      this.usuariosService.createUsuarios(data.value).subscribe(
        (data) => {
          this.toastr.success('Inicie sesión para continuar!', 'Registrado correctamente');
          this.router.navigateByUrl('/usuarios');
          this.goLogin();
        },
        // Si hay un error, se redirije a usuarios
        (err) => {
          data.reset();
          swal.fire('Error', "¡No fue posible registrarse!", 'error');
          this.router.navigateByUrl('/usuarios');
        }
      );
    }

  }
}
