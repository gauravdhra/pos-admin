import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authenticationService.isAuthenticated();
    if (isAuthenticated) {
        return true;
      // const userRole = this.authenticationService.getPrimaryUserRole();
      // if (userRole === 'admin') {
      //   return true;
      // }
    }
    this.router.navigate(['/login']);
    return false;
  }

}
