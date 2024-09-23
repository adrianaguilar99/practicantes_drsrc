import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, LocalAuthGuard, RefreshJwtAuthGuard } from './guards';
import { Public } from './decorators';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req.user);
    const {
      user: { id },
    } = req;

    return this.authService.login(id);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh-token')
  refreshToken(@Req() req) {
    const {
      user: { id },
    } = req;

    console.log(req);

    return this.authService.refreshToken(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  signOut(@Req() req) {
    return this.authService.signOut(req.user.id);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res) {
    const response = await this.authService.login(req.user.id);
    console.log({ response });

    res.redirect(`http://localhost:5173?token=${response.accessToken}`);
  }
}
