import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';
import {Color, ColorData} from './color';
import {Size, SizeData} from './size';

// import {AttributeValue, AttributeValueAdapter, AttributeValueData} from './attribute';

export class ProductItemData {
  constructor(
    public id: number,
    public quantity: number,
    public code: string,
    public price: number,
    public color: ColorData,
    public size: SizeData,
    public attributes: any[],
    public created_at: string,
    public updated_at: string,
  ) {
  }
}

export class ProductItem {
  constructor(
    public id: number,
    public quantity: number,
    public code: string,
    public price: number,
    public color: any,
    public size: any,
    public attributes: any[],
    public createdAt: string,
    public updatedAt: string,
  ) {
  }
}


export class ProductItemAdapter implements Adapter<ProductItem> {
  adapt(item: ProductItemData): ProductItem {
    return new ProductItem(
      item.id,
      item.quantity,
      item.code,
      item.price,
      item.color,
      item.size,
      item.attributes,
      item.created_at,
      item.updated_at,
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class ProductItemDataAdapter implements Adapter<ProductItemData> {
  adapt(item: ProductItem): ProductItemData {
    return new ProductItemData(
      item.id,
      item.quantity,
      item.code,
      item.price,
      item.color,
      item.size,
      item.attributes,
      item.createdAt,
      item.updatedAt,
    );
  }
}
