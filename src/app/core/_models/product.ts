import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';

export class ProductData {
  constructor(
    public id: number,
    public sku: string,
    public main_photo: string,
    public badge: string,
    public active: boolean,
    public low_stock_threshold: number,
    public brands_id: number,
    public virtual: number,
    public brand: {
      id: number,
      code: string,
      translations: {
        en: {
          name: string
        },
        ar: {
          name: string
        }
      }
    },
    public translations: {
      en: {
        name: string,
        description: string,
        specifications: string
      },
      ar: {
        name: string,
        description: string,
        specifications: string
      }
    },
    public images: any[],
    public items: any[],
    public created_at: string,
    public updated_at: string,
  ) {
  }
}

export class Product {
  constructor(
    public id: number,
    public sku: string,
    public mainPhoto: string,
    public badge: string,
    public active: boolean,
    public lowStockThreshold: number,
    public brandsId: number,
    public virtual: number,
    public brand: any,
    public nameEn: string,
    public nameAr: string,
    public descriptionEn: string,
    public descriptionAr: string,
    public specificationsEn: string,
    public specificationsAr: string,
    public images: any[],
    public items: any[],
    public createdAt: string,
    public updatedAt: string,
  ) {

  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductAdapter implements Adapter<Product> {
  adapt(item: ProductData): Product {
    return new Product(
      item.id,
      item.sku,
      item.main_photo,
      item.badge,
      item.active,
      item.low_stock_threshold,
      item.brands_id,
      item.virtual,
      item.brand,
      item.translations.en.name,
      item.translations.ar.name,
      item.translations.en.description,
      item.translations.ar.description,
      item.translations.en.specifications,
      item.translations.ar.specifications,
      item.images,
      item.items,
      item.created_at,
      item.updated_at,
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class ProductDataAdapter implements Adapter<ProductData> {
  adapt(product: Product): ProductData {
    return new ProductData(
      product.id,
      product.sku,
      product.mainPhoto,
      product.badge,
      product.active,
      product.lowStockThreshold,
      product.brandsId,
      product.virtual,
      product.brand,
      {
        en: {
          name: product.nameEn,
          description: product.descriptionEn,
          specifications: product.specificationsEn,
        },
        ar: {
          name: product.nameAr,
          description: product.descriptionAr,
          specifications: product.specificationsAr,
        }
      },
      product.images,
      product.items,
      product.createdAt,
      product.updatedAt,
    );
  }
}
