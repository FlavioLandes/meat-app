import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu-item/menu-item.model';
import { keyframes, trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [
    trigger('rowState', [
      state('ready', style({
        opacity: 1
      })),
      transition('void => ready',
        animate('300ms 0s ease-in',
          keyframes([
            style({
              opacity: 0,
              transform: 'translateX(-30px)', offset:0
            }),
            style({
              opacity: 0.8,
              transform: 'translateX(10px)', offset:0.8
            }),
            style({
              opacity: 1,
              transform: 'translateX(0px)', offset:1
            }),
          ])
        )
      ),
      transition('ready => void',
        animate('300ms 0s ease-in',
          keyframes([
            style({
              opacity: 1,
              transform: 'translateX(0px)', offset:0
            }),
            style({
              opacity: 0.8,
              transform: 'translateX(-10px)', offset:0.8
            }),
            style({
              opacity: 0,
              transform: 'translateX(30px)', offset:1
            }),
          ])
        )
      )
    ])
  ]
  
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) { }

  rowState = 'ready'

  ngOnInit() {
  }

  items() {
    return this.shoppingCartService.items
  }

  total() {
    return this.shoppingCartService.total()
  }

  clear() {
    return this.shoppingCartService.clear()
  }
  
  removeItem(item: CartItem) {
    this.shoppingCartService.remove(item)
  }

  addItem(item: any) {
    this.shoppingCartService.addItem(item)
  }
}
