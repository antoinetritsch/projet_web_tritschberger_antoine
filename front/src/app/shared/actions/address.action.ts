import { Address } from 'src/app/shared/models/address';

export class CreateAddress {
  static readonly type = '[Address] Create';

  constructor(public payload: Address) {}
}
export class DeleteAddress {
  static readonly type = '[Address] Delete';

  constructor(public payload: Address) {}
}
export class DeleteAllAddress {
  static readonly type = '[Address] DeleteAll';

  constructor() {}
}
