import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';

export class OrderData {
  constructor(
    public id: number,
    public key: string,
    public translations: {
      en: {
        name: string
      },
      ar: {
        name: string
      }
    },
    public created_at: string,
    public updated_at: string,
  ) {
  }
}

export class Order {
  constructor(
    public id: number,
    public key: string,
    public nameEn: string,
    public nameAr: string,
    public createdAt: string,
    public updatedAt: string,
  ) {

  }
}

@Injectable({
  providedIn: 'root'
})

export class OrderAdapter implements Adapter<Order> {
  adapt(order: OrderData): Order {
    return new Order(
      order.id,
      order.key,
      order.translations.en.name,
      order.translations.ar.name,
      order.created_at,
      order.updated_at,
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class OrderDataAdapter implements Adapter<OrderData> {
  adapt(order: Order): OrderData {
    return new OrderData(
      order.id,
      order.key,
      {
        en: {
          name: order.nameEn,
        },
        ar: {
          name: order.nameAr,
        }
      },
      order.createdAt,
      order.updatedAt,
    );
  }
}
