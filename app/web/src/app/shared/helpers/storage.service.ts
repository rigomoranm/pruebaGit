import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getStorage(nombre:string):any{
    return localStorage.getItem(nombre);
  }
  
  setStorage(nombre:string, valor:any):void{
      localStorage.setItem(nombre, valor);
  }
  saveObject(nombre:string, valor:any):void{
    localStorage.setItem(nombre, JSON.stringify(valor));  
  }
  
  getObject(nombre:string):any{
    return JSON.parse(localStorage.getItem(nombre));
  }
  

  removeStorage(nombre:string):any{
    return localStorage.removeItem(nombre);
  }

  actualizarUsuario(usuario:string):void{
    
    let objUsuario:any = this.getObject('usuarioActual');
    objUsuario.Usuario = usuario;
    this.saveObject('usuarioActual', objUsuario);


  }
  
}