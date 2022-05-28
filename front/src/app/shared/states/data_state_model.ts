import { ProductOwn } from 'src/app/shared/models/product_own';
import { Address } from '../models/address';

export class DataStateModel {
  products!: ProductOwn[];
  addresses!: Address[];
}
