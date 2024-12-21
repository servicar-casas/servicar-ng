import { PocketBaseClient } from "@/app/pocketbase.provider";
import { User } from "@/app/user/user";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthService {
    readonly #pocketbase = inject(PocketBaseClient);

    async login(cpf: string, phone: string) {
        const authData = await this.#pocketbase.collection('common_users').authWithPassword<User>(cpf, phone)
        return authData.record
    }

    async register(name: string, cpf: string, phone: string) {
        await this.#pocketbase.collection('common_users').create({ name, cpf, phone })
        return await this.login(cpf, phone)
    }

    isAuthenticated() {
        return this.#pocketbase.authStore.isValid
    }

    logout() {
        this.#pocketbase.authStore.clear()
    }

    getCurrentUser() {
        return this.#pocketbase.authStore.record as User | null
    }
}
