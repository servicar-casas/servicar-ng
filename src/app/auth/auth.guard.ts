import { AuthService } from "@/app/auth/auth.service";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if (!this.authService.isAuthenticated()) {
            return false;
        }

        return true;
    }
}
