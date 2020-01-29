import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';

export class PageData {


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

export class Page {
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

export class PageAdapter implements Adapter<Page> {
  adapt(page: PageData): Page {
    return new Page(
      page.id,
      page.code,
      page.translations.en.name,
      page.translations.ar.name,
      page.created_at,
      page.updated_at,
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class PageDataAdapter implements Adapter<PageData> {
  adapt(page: Page): PageData {
    return new PageData(
      page.id,
      page.code,
      {
        en: {
          name: page.nameEn,
        },
        ar: {
          name: page.nameAr,
        }
      },
      page.createdAt,
      page.updatedAt,
    );
  }
}
