import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";
import { Injectable } from "@angular/core";
import { NotificationService } from "app/shared/message/notification.service";

@Injectable()
export class ShoppingCartService {

    items: CartItem[] = []

    constructor (private notificationService: NotificationService) {

    }

    clear() {
        this.items = []
    }

    addItem(item: MenuItem) {
        let foundItem = this.items.find(cartItem => cartItem.menuItem.id === item.id)
        if (foundItem) {
            foundItem.quantity++
        } 
        else {
            this.items.push(new CartItem(item, 1))
        }

        this.notificationService.notify(`Você adicionou o item ${item.name}`)
    }

    increase(item: CartItem) {
        item.quantity++
    }

    decrease(item: CartItem) {
        item.quantity--
        if (item.quantity == 0) {
            this.remove(item)
        }
    }

    remove(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1)
        this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`)
    }

    total(): number {
        return this.items.map(item => item.value()).reduce((prev, value) => prev + value, 0)
    }
}