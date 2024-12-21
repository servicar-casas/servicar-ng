import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import PocketBase from 'pocketbase'
import type { User } from './user.d.ts';
import { JwtService } from '@/app/auth/jwt.service';
import { environment } from '@/environments/environment';

@Injectable()
export class UserService {
    pb = new PocketBase(environment.pb_url)

    constructor(
        private readonly jwtService: JwtService,
        private readonly router: Router
    ) { }

    async login(cpf: string, phone: string) {
        const authData = await this.pb.collection('common_user').authWithPassword<User>(cpf, phone)
        this.jwtService.saveToken(authData.token)

        return authData.record
    }

    async register(name: string, cpf: string, phone: string) {
        await this.pb.collection('common_user').create({ name, cpf, phone })

        return await this.login(cpf, phone)
    }

    logout() {
        this.jwtService.destroyToken();
        this.router.navigate(['/']);
    }

    saveUserLocalStorage(user: User) {
        localStorage.setItem('user', JSON.stringify(user))
    }

    getUserLocalStorage(): User | null {
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null
    }

    deleteUserLocalStorage() {
        localStorage.removeItem('user')
    }
}
