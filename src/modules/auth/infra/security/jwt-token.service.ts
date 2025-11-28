import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../../types/jwt-payload.type';

export abstract class TokenService {
  abstract generate(payload: JwtPayload): string;
}

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwt: JwtService) {}

  generate(payload: JwtPayload): string {
    return this.jwt.sign(payload);
  }
}