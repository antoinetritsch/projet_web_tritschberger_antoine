import { ApiHttpInterceptor } from '../api/api-httpinterceptor';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private httpInterceptor: ApiHttpInterceptor) {}

    canActivate(){
        if(!this.httpInterceptor.isAuthenticated()){
            this.router.navigate(['user/signin']);
        }
        return this.httpInterceptor.isAuthenticated();
    }

}