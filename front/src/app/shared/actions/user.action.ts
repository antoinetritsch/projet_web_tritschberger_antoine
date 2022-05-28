import User from '../models/User';

export class RegisterJWT {
  static readonly type = '[User] AddJWT';

  constructor(public payload: string) {}
}
export class RegisterUser {
  static readonly type = '[User] AddLogin';

  constructor(public payload: string) {}
}

