import { PocketBaseClient } from "@/app/pocketbase.provider";
import type { Car } from "@/app/products/cars";
import type { Housing } from "@/app/products/housing.d.ts";
import { inject, Injectable } from "@angular/core";

interface CartItem {
    type: 'car' | 'apartment' | 'house'
    expand:{ car: Car }
    housing: Housing
}

@Injectable({ providedIn: 'root' })
export class CartService {
    readonly #pocketbase = inject(PocketBaseClient);

    constructor() { }

    async addItem(type: 'car' | 'apartment' | 'house', housing?: Housing, carID?: string) {
        if (type === 'car') {
            await this.#pocketbase.collection('cart_items').create({ type, car: carID })
        } else if (type === 'apartment' || type === 'house') {
            await this.#pocketbase.collection('cart_items').create({ type, housing: housing })
        }
    }

    async removeItem(cartItemID: string) {
        await this.#pocketbase.collection('cart_items').delete(cartItemID)
    }

    async getItems() {
        return await this.#pocketbase.collection('cart_items').getFullList<CartItem>({ expand: 'car' })
    }
}
