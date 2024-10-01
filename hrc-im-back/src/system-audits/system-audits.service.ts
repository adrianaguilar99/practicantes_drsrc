import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemAudit } from './entities/system-audit.entity';
import { Repository } from 'typeorm';
import { handleInternalServerError } from 'src/common/utils';

@Injectable()
export class SystemAuditsService {
  constructor(
    @InjectRepository(SystemAudit)
    private readonly systemAuditsRepository: Repository<SystemAudit>,
  ) {}

  async createSystemAudit(
    user: { id: string; fullName: string; role: string },
    action: string,
    entity: { id: string; name: string },
    status: string,
    errorMessage?: string,
  ) {
    const audit = this.systemAuditsRepository.create({
      user,
      action,
      entityAffected: entity,
      status,
      errorMessage: errorMessage || null,
    });
    try {
      const savedAudit = await this.systemAuditsRepository.save(audit);
      return {
        user: savedAudit.user,
        entity: savedAudit.entityAffected,
        action: savedAudit.action,
        status: savedAudit.status,
        errorMessage: savedAudit.errorMessage,
      };
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findAll() {
    try {
      return await this.systemAuditsRepository.find();
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} audit`;
  }
}
