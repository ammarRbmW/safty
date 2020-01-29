import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';

export class CurrencyData {
  constructor(
    public id: number,
    public code: string,
    public is_base_currency: any,
    public exchange_rate: number,
    public translations: {
      en: {
        name: string,
        symbol: string,
      },
      ar: {
        name: string,
        symbol: string,
      }
    },
    public created_at: string,
    public updated_at: string,
  ) {
  }
}

export class Currency {
  constructor(
    public id: number,
    public code: string,
    public isBaseCurrency: any,
    public exchangeRate: number,
    public nameEn: string,
    public nameAr: string,
    public symbolEn: string,
    public symbolAr: string,
    public createdAt: string,
    public updatedAt: string,
  ) {

  }
}

@Injectable({
  providedIn: 'root'
})

export class CurrencyAdapter implements Adapter<Currency> {
  adapt(currency: CurrencyData): Currency {
    return new Currency(
      currency.id,
      currency.code,
      currency.is_base_currency,
      currency.exchange_rate,
      currency.translations.en.name,
      currency.translations.ar.name,
      currency.translations.en.symbol,
      currency.translations.ar.symbol,
      currency.created_at,
      currency.updated_at,
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class CurrencyDataAdapter implements Adapter<CurrencyData> {
  adapt(currency: Currency): CurrencyData {
    return new CurrencyData(
      currency.id,
      currency.code,
      currency.isBaseCurrency,
      currency.exchangeRate,
      {
        en: {
          name: currency.nameEn,
          symbol: currency.symbolEn,
        },
        ar: {
          name: currency.nameAr,
          symbol: currency.symbolAr,
        }
      },
      currency.createdAt,
      currency.updatedAt,
    );
  }
}
