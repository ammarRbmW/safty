import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';

export class AttributeData {
  constructor(
    public id: number,
    public key: string,
    public translations: {
      en: {
        name: string
      },
      ar: {
        name: string
      }
    },
    public created_at: string,
    public updated_at: string
  ) {
  }
}

export class Attribute {
  constructor(
    public id: number,
    public key: string,
    public nameEn: string,
    public nameAr: string,
    public createdAt: string,
    public updatedAt: string
  ) {

  }
}

@Injectable({
  providedIn: 'root'
})

export class AttributeAdapter implements Adapter<Attribute> {
  adapt(item: AttributeData): Attribute {
    return new Attribute(
      item.id,
      item.key,
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

export class AttributeDataAdapter implements Adapter<AttributeData> {
  adapt(attribute: Attribute): AttributeData {
    return new AttributeData(
      attribute.id,
      attribute.key,
      {
        en: {
          name: attribute.nameEn,
        },
        ar: {
          name: attribute.nameAr,
        }
      },
      attribute.createdAt,
      attribute.updatedAt,
    );
  }
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
export class AttributeValueData {
  constructor(
    public attributes_id: number,
    public translations: {
      en: {
        value: string
      }, ar: {
        value: string
      }
    },
    public created_at: string,
    public updated_at: string
  ) {
  }
}

export class AttributeValue {
  constructor(
    public attributes_id: number,
    public valueEn: string,
    public valueAr: string,
    public createdAt: string,
    public updatedAt: string
  ) {

  }
}

@Injectable({
  providedIn: 'root'
})

export class AttributeValueAdapter implements Adapter<AttributeValue> {
  adapt(item: AttributeValueData): AttributeValue {
    return new AttributeValue(
      item.attributes_id,
      item.translations.en.value,
      item.translations.ar.value,
      item.created_at,
      item.updated_at,
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class AttributeValueDataAdapter implements Adapter<AttributeValueData> {
  adapt(attribute: AttributeValue): AttributeValueData {
    return new AttributeValueData(
      attribute.attributes_id,
      {
        en: {
          value: attribute.valueEn,
        },
        ar: {
          value: attribute.valueAr,
        }
      },
      attribute.createdAt,
      attribute.updatedAt,
    );
  }
}
