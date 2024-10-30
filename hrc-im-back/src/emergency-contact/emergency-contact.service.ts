import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmergencyContactDto } from './dto/create-emergency-contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency-contact.dto';
import { IRequestUser } from 'src/common/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { EmergencyContact } from './entities/emergency-contact.entity';
import { Repository } from 'typeorm';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { InternsService } from 'src/interns/interns.service';
import { handleInternalServerError } from 'src/common/utils';

@Injectable()
export class EmergencyContactService {
  constructor(
    @InjectRepository(EmergencyContact)
    private readonly emergencyContactsRepository: Repository<EmergencyContact>,
    private readonly internsService: InternsService,
    private readonly systemAuditsService: SystemAuditsService,
  ) {}

  async create(
    createEmergencyContactDto: CreateEmergencyContactDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    // Buscamos y relacionamos al practicante o interno
    const intern = await this.internsService.findOne(
      createEmergencyContactDto.internId,
    );

    const newEmergencyContact = this.emergencyContactsRepository.create({
      ...createEmergencyContactDto,
      intern,
    });
    try {
      const createdEmergencyContact =
        await this.emergencyContactsRepository.save(newEmergencyContact);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'CREATE EMERGENCY CONTACT',
        {
          id: createdEmergencyContact.id,
          data: `${createdEmergencyContact.name}`,
        },
        'SUCCESS',
      );
      return createdEmergencyContact;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO CREATE EMERGENCY CONTACT',
        { id: null, data: `${newEmergencyContact.name}` },
        'FAILED TO CREATE INTERN',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async findAll() {
    try {
      const allEmergencyContacts =
        await this.emergencyContactsRepository.find();
      return allEmergencyContacts;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string) {
    const emergencyContact = await this.emergencyContactsRepository.findOne({
      where: { id },
      relations: {
        intern: true,
      },
    });
    if (!emergencyContact)
      throw new NotFoundException(
        `Emergency contact with id: ${id} not found.`,
      );
    return emergencyContact;
  }

  async update(
    id: string,
    { name, phone, relationship, positionContact }: UpdateEmergencyContactDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    const existingEmergencyContact = await this.findOne(id);

    if (name) existingEmergencyContact.name = name;
    if (phone) existingEmergencyContact.phone = phone;
    if (relationship) existingEmergencyContact.relationship = relationship;
    if (positionContact)
      existingEmergencyContact.positionContact = positionContact;

    try {
      const updatedContact = await this.emergencyContactsRepository.save(
        existingEmergencyContact,
      );
      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'UPDATE EMERGENCY CONTACT',
        {
          id,
          data: `${updatedContact.name}`,
        },
        'SUCCESS',
      );
      return updatedContact;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        { id: userId, fullName, role },
        'TRY TO UPDATE EMERGENCY CONTACT',
        { id, data: name },
        'FAILED TO UPDATE EMERGENCY CONTACT',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async remove(id: string, { fullName, role, userId }: IRequestUser) {
    const existingEmergencyContact = await this.findOne(id);
    try {
      const deletedEmergencyContact =
        await this.emergencyContactsRepository.delete(id);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'DELETE EMERGENCY CONTACT',
        { id, data: existingEmergencyContact.name },
        'SUCCESS',
      );
      return deletedEmergencyContact.affected;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO DELETE EMERGENCY CONTACT',
        { id, data: `${existingEmergencyContact.name}` },
        'FAILED TO DELETE EMERGENCY CONTACT',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }
}
