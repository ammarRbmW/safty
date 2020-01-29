import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';


export class BrandData {
  constructor(
    public id: number,
    public code: string,
    public image: string,
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

export class Brand {
  constructor(
    public id: number,
    public code: string,
    public image: string,
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

export class BrandAdapter implements Adapter<Brand> {
  adapt(item: BrandData): Brand {
    return new Brand(
      item.id,
      item.code,
      item.image,
      item.translations.en.name,
      item.translations.ar.name,
      item.created_at,
      item.updated_at,
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class BrandDataAdapter implements Adapter<BrandData> {
  adapt(brand: Brand): BrandData {
    return new BrandData(
      brand.id,
      brand.code,
      brand.image,
      {
        en: {
          name: brand.nameEn,
        },
        ar: {
          name: brand.nameAr,
        }
      },
      brand.createdAt,
      brand.updatedAt
    );
  }
}
