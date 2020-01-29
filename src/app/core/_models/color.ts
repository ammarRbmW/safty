import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';


export class ColorData {
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

export class Color {
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

export class ColorAdapter implements Adapter<Color> {
  adapt(item: ColorData): Color {
    return new Color(
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

export class ColorDataAdapter implements Adapter<ColorData> {
  adapt(color: Color): ColorData {
    return new ColorData(
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
      color.updatedAt
    );
  }
}
