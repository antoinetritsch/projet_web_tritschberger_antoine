
import { ProductOwn } from 'src/app/shared/models/product_own';
import { Product } from '../models/product';

export class CreateProduct {
  static readonly type = '[ProductOwn] Create';

  constructor(public payload: Product) {}
}
export class DeleteProduct {
  static readonly type = '[ProductOwn] Delete';

  constructor(public payload: ProductOwn) {}
}
export class DeleteAllProduct {
  static readonly type = '[ProductOwn] DeleteAll';

  constructor() {}
}
