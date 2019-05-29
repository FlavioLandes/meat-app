import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { Injectable } from "@angular/core";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Order } from "./order.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MEAT_API } from "app/app.api";
import { LoginService } from "app/security/login/login.service";
import { map } from "rxjs/operators";

@Injectable()
export class OrderService {
    constructor(private cartService: ShoppingCartService,
         private http: HttpClient
         //private loginService: LoginService
         ) {

    }

    itemsValue(): number {
        return this.cartService.total()
      }

    cartItems(): CartItem[] {
        return this.cartService.items
    }

    increase(item: CartItem) {
        this.cartService.increase(item)
    }

    decrease(item: CartItem) {
        this.cartService.decrease(item)
    }

    remove(item: CartItem) {
        this.cartService.remove(item)
    }

    checkOrder(order: Order): Observable<string> {
        // let headers = new HttpHeaders()
        // if(this.loginService.isLoggedIn()) {
        //     headers = headers.set('Authorization', `Bearer ${this.loginService.user.acessToken}`)
        // }

        // return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers: headers})
        // .map(order => order.id)
        return this.http.post<Order>(`${MEAT_API}/orders`, order)
         .pipe(map(order => order.id))
    }

    clear() {
        this.cartService.clear()
    }
}