export class Review {
  constructor(
    public id: number,
    public review: string,
    public rating: string,
    public approved: number,
    public users_id: number,
    public products_id: number,
    public product: any,
    public user: any,
  ) {
  }
}
