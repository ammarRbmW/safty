import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';

export class AdData {
  constructor(
    public id: number,
    // public key: string,
    public translations: {
      en: {
        title: string,
        sub_title: string
      },
      ar: {
        title: string,
        sub_title: string
      }
    },
    public image: string,
    public url: string,
    public position: string,
    public active: boolean,
    public title: string,
    public sub_title: string,
    public price: string,
    public discount: string,
    public created_at: string,
    public updated_at: string,
  ) {
  }
}

export class Ad {
  constructor(
    public id: number,
    // public key: string,
    public titleEn: string,
    public titleAr: string,
    public subTitleEn: string,
    public subTitleAr: string,
    public image: string,
    public url: string,
    public position: string,
    public active: boolean,
    public title: string,
    public sub_title: string,
    public price: string,
    public discount: string,
    public createdAt: string,
    public updatedAt: string,
  ) {

  }
}

@Injectable({
  providedIn: 'root'
})

export class AdAdapter implements Adapter<Ad> {
  adapt(ad: AdData): Ad {
    return new Ad(
      ad.id,
      ad.translations.en.title,
      ad.translations.ar.title,
      ad.translations.en.sub_title,
      ad.translations.ar.sub_title,
      ad.image,
      ad.url,
      ad.position,
      ad.active,
      ad.title,
      ad.sub_title,
      ad.price,
      ad.discount,
      ad.created_at,
      ad.updated_at,
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class AdDataAdapter implements Adapter<AdData> {
  adapt(ad: Ad): AdData {
    return new AdData(
      ad.id,
      // ad.key,
      {
        en: {
          title: ad.titleEn,
          sub_title: ad.subTitleEn,
        },
        ar: {
          title: ad.titleAr,
          sub_title: ad.subTitleAr
        }
      },
      ad.image,
      ad.url,
      ad.position,
      ad.active,
      ad.title,
      ad.sub_title,
      ad.price,
      ad.discount,
      ad.createdAt,
      ad.updatedAt,
    );
  }
}
