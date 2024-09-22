import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { PASSWORD_REQUIRED } from 'src/common/constants/constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }
  validate(email: string, password: string) {
    if (password === '') throw new UnauthorizedException(PASSWORD_REQUIRED);
    return this.authService.validateUser(email, password);
  }
}
