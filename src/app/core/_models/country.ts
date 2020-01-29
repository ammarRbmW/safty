import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';

export class CountryData {
  constructor(
    public id: number,
    public shipping_zones_id: number,
    public translations: {
      en: {
        name: string
      },
      ar: {
        name: string
      }
    },
    public iso2: string,
    public iso3: string,
    public created_at: string,
    public updated_at: string,
  ) {
  }
}

export class Country {
  constructor(
    public id: number,
    public shipping_zones_id: number,
    public nameEn: string,
    public nameAr: string,
    public iso2: string,
    public iso3: string,
    public createdAt: string,
    public updatedAt: string,
  ) {

  }
}

@Injectable({
  providedIn: 'root'
})

export class CountryAdapter implements Adapter<Country> {
  adapt(country: CountryData): Country {
    return new Country(
      country.id,
      country.shipping_zones_id,
      country.translations.en.name,
      country.translations.ar.name,
      country.iso2,
      country.iso3,
      country.created_at,
      country.updated_at,
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class CountryDataAdapter implements Adapter<CountryData> {
  adapt(country: Country): CountryData {
    return new CountryData(
      country.id,
      country.shipping_zones_id,
      {
        en: {
          name: country.nameEn,
        },
        ar: {
          name: country.nameAr,
        }
      },
      country.iso2,
      country.iso3,
      country.createdAt,
      country.updatedAt,
    );
  }
}
