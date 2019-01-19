import { Injectable } from '@angular/core';
import { StorageService } from '../shared/helpers/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storageService:StorageService
    
  ) { }


  ///get se usa para tratar a estos metodos como propiedades
  get isLoggedIn() {

    
    if (this.storageService.getStorage('usuarioActual')) {
      
      return true;
  }

    return false;
  }

  get isSuperAdmin() {
    return true;
  }

}
