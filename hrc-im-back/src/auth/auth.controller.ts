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
import { LocalAuthGuard, RefreshJwtAuthGuard } from './guards';
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
    const { id } = req.user;
    return this.authService.login(id);
  }

  @Public()
  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh-token')
  refreshToken(@Req() req) {
    const { id } = req.user;
    return this.authService.refreshToken(id);
  }

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
    const { id } = req.user;
    const response = await this.authService.login(id);
    res.redirect(
      `http://localhost:5173?token=${response.accessToken}&refreshToken=${response.refreshToken}`,
    );
  }
}
