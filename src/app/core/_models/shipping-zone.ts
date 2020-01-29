import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';

export class ShippingZoneData {
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

export class ShippingZone {
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

export class ShippingZoneAdapter implements Adapter<ShippingZone> {
  adapt(shippingZone: ShippingZoneData): ShippingZone {
    return new ShippingZone(
      shippingZone.id,
      shippingZone.code,
      shippingZone.translations.en.name,
      shippingZone.translations.ar.name,
      shippingZone.created_at,
      shippingZone.updated_at,
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class ShippingZoneDataAdapter implements Adapter<ShippingZoneData> {
  adapt(shippingZone: ShippingZone): ShippingZoneData {
    return new ShippingZoneData(
      shippingZone.id,
      shippingZone.code,
      {
        en: {
          name: shippingZone.nameEn,
        },
        ar: {
          name: shippingZone.nameAr,
        }
      },
      shippingZone.createdAt,
      shippingZone.updatedAt,
    );
  }
}
