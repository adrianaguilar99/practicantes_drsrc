import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HRC Tests')
@Controller('tests')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ok')
  getHello(): string {
    return this.appService.getHello();
  }
}
