import { Request } from 'express';

export class AuthenticatedRequest extends Request {
  user: {
    userId: number;
    email: string;
    jti: string;
    isAdmin: boolean;
  };
}
