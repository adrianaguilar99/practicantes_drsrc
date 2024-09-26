import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags('HRC Tests')
@Controller('tests')
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly appService: AppService,
  ) {}

  @Get('ok')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('dbDev')
  getDbDev() {
    return this.configService.getOrThrow(
      'dbConfig.development.env.synchronize',
    );
  }

  @Get('dbProd')
  getDbProd() {
    return this.configService.getOrThrow('dbConfig.production.env.synchronize');
  }
}
