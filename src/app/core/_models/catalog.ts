import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';

export class CatalogData {
  constructor(
    public id: number,
    public code: string,
    public translations: {
      en: {
        name: string,
        description: string,
      },
      ar: {
        name: string,
        description: string,
      }
    },
    public created_at: string,
    public updated_at: string,
  ) {
  }
}

export class Catalog {
  constructor(
    public id: number,
    public code: string,
    public nameEn: string,
    public nameAr: string,
    public descriptionEn: string,
    public descriptionAr: string,
    public createdAt: string,
    public updatedAt: string,
  ) {

  }
}

@Injectable({
  providedIn: 'root'
})

export class CatalogAdapter implements Adapter<Catalog> {
  adapt(item: CatalogData): Catalog {
    return new Catalog(
      item.id,
      item.code,
      item.translations.en.name,
      item.translations.ar.name,
      item.translations.en.description,
      item.translations.ar.description,
      item.created_at,
      item.updated_at,
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class CatalogDataAdapter implements Adapter<CatalogData> {
  adapt(catalog: Catalog): CatalogData {
    return new CatalogData(
      catalog.id,
      catalog.code,
      {
        en: {
          name: catalog.nameEn,
          description: catalog.descriptionEn,
        },
        ar: {
          name: catalog.nameAr,
          description: catalog.descriptionAr,
        }
      },
      catalog.createdAt,
      catalog.updatedAt,
    );
  }
}
