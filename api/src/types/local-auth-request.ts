import { Request } from 'express';
import { User } from 'src/typeORM';
export class LocalAuthRequest extends Request {
  user: User;
}
