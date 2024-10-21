import { Injectable } from '@nestjs/common';
import { CreateEmergencyContactDto } from './dto/create-emergency-contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency-contact.dto';
import { IRequestUser } from 'src/common/interfaces';

@Injectable()
export class EmergencyContactService {
  async create(
    createEmergencyContactDto: CreateEmergencyContactDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    return 'This action adds a new emergencyContact';
  }

  async findAll() {
    return `This action returns all emergencyContact`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} emergencyContact`;
  }

  async update(
    id: number,
    updateEmergencyContactDto: UpdateEmergencyContactDto,
  ) {
    return `This action updates a #${id} emergencyContact`;
  }

  async remove(id: number) {
    return `This action removes a #${id} emergencyContact`;
  }
}
