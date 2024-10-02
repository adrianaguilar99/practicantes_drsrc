import { Injectable } from '@nestjs/common';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';

@Injectable()
export class SupervisorsService {
  async create(createSupervisorDto: CreateSupervisorDto) {
    return 'This action adds a new supervisor';
  }

  async findAll() {
    return `This action returns all supervisors`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} supervisor`;
  }

  async update(id: string, updateSupervisorDto: UpdateSupervisorDto) {
    return `This action updates a #${id} supervisor`;
  }

  async remove(id: string) {
    return `This action removes a #${id} supervisor`;
  }
}
