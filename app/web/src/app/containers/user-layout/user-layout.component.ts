import {Component, OnDestroy} from '@angular/core';
import { navItemsUser } from './../../_nav';
import { StorageService } from 'src/app/shared/helpers/storage.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario.service';
import { stringify } from '@angular/core/src/render3/util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './user-layout.component.html'
})
export class UserLayoutComponent implements OnDestroy {
  public navItems = navItemsUser;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public menuNivel1:string;
  public menuNivel2:string;
  public routerNivel1:string;
  constructor(private storageService: StorageService,
    private router: Router,
    private usuarioService:UsuarioService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: [ 'class' ]
    });

    router.events.subscribe( (event: Event) => {

      // if (event instanceof NavigationStart) {
      //     // Show loading indicator
      // }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
          this.asignarTitulo(router.url);
        
      }

      // if (event instanceof NavigationError) {
      //     // Hide loading indicator

      //     // Present error to user
      //     console.log(event.error);
      // }
  });

    
    

  }
  usuarioActual:string;


  asignarTitulo(pagina:String):String{
    let menu1='';
    let menu2='';

    this.menuNivel1 = '';
    this.menuNivel2 = '';
    this.routerNivel1 = '';

    console.log(pagina.toUpperCase());
    switch(pagina.toUpperCase()){

      case '/USER/INICIO':

        menu1 = 'Inicio';
      break;
      case '/USER/CUENTA':
      menu1 = 'Cuenta';
      break;
      case '/USER/CONTRASENA':
      menu1 =  'Cuenta';
      break;
      
      case '/USER/CONFIGURACION':
      menu1 =  'Configuración';
      break;
      case '/USER/PREF-GENERALES':
        this.routerNivel1='/user/configuracion';
        menu1 = 'Configuración';
        menu2 =  'Preferencias Generales';
      break;
      case '/USER/IMPUESTOS':
      this.routerNivel1='/user/configuracion';
      menu1 = 'Configuración';
      menu2 =  'Impuestos';
      break;
      case '/USER/RETENCIONES':
      this.routerNivel1='/user/configuracion';
      menu1 = 'Configuración';
      menu2 =  'Retenciones';
      break;
      case '/USER/TER-PAGO':
      this.routerNivel1='/user/configuracion';
      menu1 = 'Configuración';
      menu2 =  'Términos de pago';
      break;
      case '/USER/PLANES':
      this.routerNivel1='/user/configuracion';
      menu2 =  'Planes';
      break;
      
      default:
        return '';
      break;
    }
    this.menuNivel1 =menu1;
    this.menuNivel2 = menu2;
    
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  ngOnInit() {
    ///asigna el nombre del usuario a la variable local
    let obj:any =    this.storageService.getObject('usuarioActual');
    this.usuarioActual = obj.email;

  }

  
  salir():void{

    this.usuarioService.logout();
    this.router.navigate(['/login']);    
    

  }
  
}
