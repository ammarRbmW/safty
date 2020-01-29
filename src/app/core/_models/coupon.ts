import {Injectable} from '@angular/core';
import {Adapter} from '../_services/adapter';

export class CouponData {
  constructor(
    public id: number,
    public code: string,
    public discount_type: string,
    public value: string,
    public start_date: string,
    public end_date: string,
    public created_at: string,
    public updated_at: string,
  ) {
  }
}

export class Coupon {
  constructor(
    public id: number,
    public code: string,
    public discountType: string,
    public value: string,
    public startDate: string,
    public endDate: string,
    public createdAt: string,
    public updatedAt: string,
  ) {

  }
}

@Injectable({
  providedIn: 'root'
})

export class CouponAdapter implements Adapter<Coupon> {
  adapt(coupon: CouponData): Coupon {
    return new Coupon(
      coupon.id,
      coupon.code,
      coupon.discount_type,
      coupon.value,
      coupon.start_date,
      coupon.end_date,
      coupon.created_at,
      coupon.updated_at,
    );
  }
}

@Injectable({
  providedIn: 'root'
})

export class CouponDataAdapter implements Adapter<CouponData> {
  adapt(coupon: Coupon): CouponData {
    return new CouponData(
      coupon.id,
      coupon.code,
      coupon.discountType,
      coupon.value,
      coupon.startDate,
      coupon.endDate,
      coupon.createdAt,
      coupon.updatedAt,
    );
  }
}
