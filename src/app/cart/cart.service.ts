import type { Car } from "@/app/products/cars.d.ts";
import type { Housing } from "@/app/products/housing.d.ts";
import { environment } from "@/environments/environment";
import { Injectable } from "@angular/core";
import pocketbase from "pocketbase"

interface CartItem {
    type: 'car' | 'apartment' | 'house'
    product: Car
    other: Housing
}

@Injectable()
export class CartService {
    pb = new pocketbase(environment.pb_url)

    constructor() { }

    async addItem(id: string) {
        await this.pb.collection('cart_items').create({ product: id })
    }

    async removeItem(id: string) {
        await this.pb.collection('cart_items').delete(id)
    }

    async getItems() {
        return await this.pb.collection('cart_items').getFullList<CartItem>()
    }
}
