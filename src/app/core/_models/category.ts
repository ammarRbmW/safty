import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';

export class CategoryData {
  constructor(
    public id: number,
    public code: string,
    public image: string,
    public parent_category_id: number,
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

export class Category {
  constructor(
    public id: number,
    public code: string,
    public image: string,
    public parentCategoryId: number,
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

export class CategoryAdapter implements Adapter<Category> {
  adapt(item: CategoryData): Category {
    return new Category(
      item.id,
      item.code,
      item.image,
      item.parent_category_id,
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

export class CategoryDataAdapter implements Adapter<CategoryData> {
  adapt(category: Category): CategoryData {
    return new CategoryData(
      category.id,
      category.code,
      category.image,
      category.parentCategoryId,
      {
        en: {
          name: category.nameEn,
        },
        ar: {
          name: category.nameAr,
        }
      },
      category.createdAt,
      category.updatedAt,
    );
  }
}
