import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';


export class SizeData {
  constructor(
    public id: number,
    public code: string,
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

export class Size {
  constructor(
    public id: number,
    public code: string,
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

export class SizeAdapter implements Adapter<Size> {
  adapt(item: SizeData): Size {
    return new Size(
      item.id,
      item.code,
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

export class SizeDataAdapter implements Adapter<SizeData> {
  adapt(color: Size): SizeData {
    return new SizeData(
      color.id,
      color.code,
      {
        en: {
          name: color.nameEn,
        },
        ar: {
          name: color.nameAr,
        }
      },
      color.createdAt,
      color.updatedAt,
    );
  }
}
