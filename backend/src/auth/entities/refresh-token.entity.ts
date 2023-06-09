import { sign } from 'jsonwebtoken';

export class RefreshToken {
  constructor(init?: Partial<RefreshToken>) {
    Object.assign(this, init);
  }

  id: number;
  email: string;
  nickname: string;
  userAgent: string;
  ipAddress: string;

  sign(): string {
    return sign({ ...this }, process.env.REFRESH_SECRET);
  }
}
