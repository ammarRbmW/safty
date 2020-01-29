import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';

export class ArticleData {
  constructor(
    public id: number,
    public main_image: string,
    public date: string,
    public article_page_id: number,
    public translations: {
      en: {
        title: string,
        description: string,
        text: string,
        tags: string
      },
      ar: {
        title: string,
        description: string,
        text: string,
        tags: string
      }
    }
  ) {
  }
}

export class Article {
  constructor(
    public id: number,
    public mainImage: string,
    public date: string,
    public articlePageId: number,
    public titleEn: string,
    public titleAr: string,
    public descriptionEn: string,
    public descriptionAr: string,
    public textEn: string,
    public textAr: string,
    public tagsEn: string,
    public tagsAr: string,
  ) {

  }
}

@Injectable({
  providedIn: 'root'
})

export class ArticleAdapter implements Adapter<Article> {
  adapt(article: ArticleData): Article {
    return new Article(
      article.id,
      article.main_image,
      article.date,
      article.article_page_id,
      article.translations.en.title,
      article.translations.ar.title,
      article.translations.en.description,
      article.translations.ar.description,
      article.translations.en.text,
      article.translations.ar.text,
      article.translations.en.tags,
      article.translations.ar.tags,
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class ArticleDataAdapter implements Adapter<ArticleData> {
  adapt(article: Article): ArticleData {
    return new ArticleData(
      article.id,
      article.mainImage,
      article.date,
      article.articlePageId,
      {
        en: {
          title: article.titleEn,
          description: article.descriptionEn,
          text: article.textEn,
          tags: article.tagsEn
        },
        ar: {
          title: article.titleAr,
          description: article.descriptionAr,
          text: article.textAr,
          tags: article.tagsAr
        }
      }
    );
  }
}
