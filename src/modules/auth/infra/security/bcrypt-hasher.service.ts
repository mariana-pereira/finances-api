import * as bcrypt from 'bcryptjs';

export abstract class Hasher {
  abstract hash(plain: string): Promise<string>;
  abstract compare(plain: string, hash: string): Promise<boolean>;
}

export class BcryptHasher implements Hasher {
  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, 8);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}