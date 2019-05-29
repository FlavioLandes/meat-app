class Order {
    constructor(
        public address: number, 
        public number: number, 
        public optionalAdress: string, 
        public paymantOption: string,
        public items: OrderItem[] = [],
        public id?: string
    ) {
            
      }
}

class OrderItem {
    constructor(public quantity: number, public menuId: string) {

    }
}

export {Order, OrderItem}