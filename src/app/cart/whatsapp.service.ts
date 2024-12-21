import type { Housing } from "@/app/products/housing";
import type { Car } from "@/app/products/cars";
import { CartService } from "@/app/cart/cart.service";
import { Injectable } from "@angular/core";
import { environment } from "@/environments/environment";
import { AuthService } from "@/app/auth/auth.service";

@Injectable({ providedIn: 'root' })
export class WhatsappService {
    constructor(
        private readonly authService: AuthService,
        private readonly cartService: CartService
    ) { }

    async prepareMessage() {
        const user = this.authService.getCurrentUser()
        const items = await this.cartService.getItems()

        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        let message = `Olá, meu nome é ${user.name}, CPF: ${user.cpf} e telefone: ${user.phone} `
        message += 'gostaria de realizar a seguinte compra: \n\n'

        for (const item of items) {
            if (item.type === 'car') {
                const car = item.product as Car

                message += `${car.company} ${car.name} (${car.year})\n`
            } else if (item.type === 'apartment' || item.type === 'house') {
                const property = item.other

                message += this.generatePropertyMessage(property)
            }
        }

        return message
    }

    generatePropertyMessage(property: Housing, type?: 'apartment' | 'house'): string {
        let message = type === 'apartment' ? 'Apartamento:\n' : 'Casa:\n'

        message += `- Região: ${property.location}\n`;
        message += `- Quartos: ${property.bedrooms}\n`;
        message += `- Banheiros: ${property.bathrooms}\n`;
        message += `- Tamanho: ${property.size} m²\n`;
        message += `- Preço Esperado: R$ ${property.price.toLocaleString('pt-BR')}\n`;
        message += `- Vagas de Estacionamento: ${property.parkingSpaces}\n`;
        message += `- Aceita Pets: ${property.petFriendly ? 'Sim' : 'Não'}\n`;

        if (property.yearBuilt) {
            message += `- Ano de Construção: ${property.yearBuilt}\n`;
        }
        if (property.pool) {
            message += `- Piscina: Sim\n`;
        }

        if ('garden' in property) {
            message += `- Jardim: ${property.garden ? 'Sim' : 'Não'}\n`;
        } else if ('balcony' in property) {
            message += `- Varanda: ${property.balcony ? 'Sim' : 'Não'}\n`;
        }

        return message;
    }

    generateWaLink(message: string) {
        return `${environment.whatsapp_url}?text=${encodeURI(message)}`
    }
}
