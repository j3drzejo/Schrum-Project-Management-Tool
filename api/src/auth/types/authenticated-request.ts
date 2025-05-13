import { Request } from 'express';
import { User } from 'src/typeORM';

export class AuthenticatedRequest extends Request {
  user: User;
}
