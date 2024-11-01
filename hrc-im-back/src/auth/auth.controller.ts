import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard, RefreshJwtAuthGuard } from './guards';
import { Public } from './decorators';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { LoginAuthDto } from './dtos/login-auth.dto';
import {
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
  INVALID_USER_OR_MISSING_REFRESH_TOKEN,
  LOGIN_USER,
  REFRESH_JWT_TOKEN,
  SUCCESSFUL_REFRESH_TOKEN,
  UNAUTHORIZED_ACCESS,
  USER_LOGGED,
  USER_LOGGED_OUT,
  USER_LOGOUT,
  USER_NOT_FOUND,
} from 'src/common/constants/constants';
import { ENV } from 'src/configs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: LOGIN_USER })
  @ApiResponse({ status: 201, description: USER_LOGGED })
  @ApiResponse({ status: 401, description: INVALID_CREDENTIALS })
  @ApiResponse({ status: 404, description: USER_NOT_FOUND })
  @HttpCode(201)
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto, @Request() req) {
    const { id } = req.user;
    return await this.authService.login(id);
  }

  // Esta ruta es publica ya que debido a que todas las rutas estan protegidas implicitamente
  // por la configuracion global de Auth, cada ruta necesita un JWT para que se puedan realizar
  // solicitudes, pero esta es necesario que sea publica para que el refreshToken pueda actualizarse
  @Public()
  @UseGuards(RefreshJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: REFRESH_JWT_TOKEN })
  @ApiResponse({ status: 201, description: SUCCESSFUL_REFRESH_TOKEN })
  @ApiResponse({
    status: 401,
    description: `${UNAUTHORIZED_ACCESS}. ${INVALID_USER_OR_MISSING_REFRESH_TOKEN}`,
  })
  @HttpCode(201)
  @Post('refresh-token')
  async refreshToken(@Req() req) {
    const { id } = req.user;
    return await this.authService.refreshToken(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: USER_LOGOUT })
  @ApiResponse({ status: 201, description: USER_LOGGED_OUT })
  @ApiResponse({
    status: 500,
    description: `${INTERNAL_SERVER_ERROR}: ${USER_NOT_FOUND}`,
  })
  @HttpCode(201)
  @Post('logout')
  async logOut(@Req() req) {
    return await this.authService.logout(req.user.userId);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @ApiExcludeEndpoint()
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @ApiExcludeEndpoint()
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res) {
    const { id } = req.user;
    const { accessToken, refreshToken } = await this.authService.login(id);
    res.redirect(
      `${ENV.FRONT_URL_REDIRECT}?token=${accessToken}&refreshToken=${refreshToken}`,
    );
  }
}
