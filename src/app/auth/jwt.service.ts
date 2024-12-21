import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JwtService {
    getToken(): string | null {
        return window.localStorage.getItem('token');
    }

    saveToken(token: string): void {
        window.localStorage.setItem('token', token);
    }

    destroyToken(): void {
        window.localStorage.removeItem('token');
    }

    getExpirationDate(token: string): Date {
        console.log('getExpirationDate');
        const decoded = JSON.parse(window.atob(token.split('.')[1]));
        return new Date(decoded.exp * 1000);
    }

    isTokenExpired(token: string): boolean {
        try {
            const date = this.getExpirationDate(token);
            return !(date.valueOf() > new Date().valueOf());
        } catch (e) {
            return false;
        }
    }
}
