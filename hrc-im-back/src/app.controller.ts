import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Public } from './auth/decorators';

@ApiTags('Dreams Sapphire Resort & Spa Tests')
@Controller('tests')
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly appService: AppService,
  ) {}

  @Public()
  @Get('ok')
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiBearerAuth()
  @Get('dbDev')
  getDbDev() {
    return this.configService.getOrThrow(
      'dbConfig.development.env.synchronize',
    );
  }

  @ApiBearerAuth()
  @Get('dbProd')
  getDbProd() {
    return this.configService.getOrThrow('dbConfig.production.env.synchronize');
  }
}
