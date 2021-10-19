import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from './usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  
  @ViewChild('signInForm') signInForm!: ElementRef;

  constructor(
    public usuariosService: UsuariosService,
    private router: Router
    ) { }

  ngOnInit(): void {
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
      })
  }

}
