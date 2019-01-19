import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirect(page:string):void
  {
    this.router.navigate(['/user/'+page]);
  }

}
