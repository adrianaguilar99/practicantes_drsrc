import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { handleInternalServerError } from 'src/common/utils';
import { RESOURCE_NAME_ALREADY_EXISTS } from 'src/common/constants/constants';
import { SystemAuditsService } from 'src/system-audits/system-audits.service';
import { IRequestUser } from 'src/common/interfaces';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertiesRepository: Repository<Property>,
    private readonly systemAuditsService: SystemAuditsService,
  ) {}

  async create(
    createPropertyDto: CreatePropertyDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    const newProperty = this.propertiesRepository.create(createPropertyDto);
    try {
      const createdProperty = await this.propertiesRepository.save(newProperty);
      const { interns, ...data } = createdProperty;
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'CREATE PROPERTY',
        data,
        'SUCCESS',
      );
      return createdProperty;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO CREATE PROPERTY',
        createPropertyDto,
        'FAILED TO CREATE PROPERTY',
        error.message,
      );
      if (error.code === '23505')
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }

  async findAll() {
    try {
      const properties = await this.propertiesRepository.find({
        order: { createdAt: 'DESC' },
      });
      return properties;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string) {
    const property = await this.propertiesRepository.findOne({
      where: { id },
    });
    if (!property)
      throw new NotFoundException(`Property with id: ${id} not found.`);
    return property;
  }

  async update(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
    { fullName, role, userId }: IRequestUser,
  ) {
    await this.findOne(id);
    try {
      const propertyToUpdate = await this.propertiesRepository.preload({
        id,
        ...updatePropertyDto,
      });
      const updatedProperty =
        await this.propertiesRepository.save(propertyToUpdate);
      const { interns, ...data } = updatedProperty;
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'UPDATE PROPERTY',
        data,
        'SUCCESS',
      );
      return updatedProperty;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO UPDATE PROPERTY',
        updatePropertyDto,
        'FAILED TO UPDATE PROPERTY',
        error.message,
      );
      if (error.code === '23505')
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }

  async remove(id: string, { fullName, role, userId }: IRequestUser) {
    const existingProperty = await this.findOne(id);
    const { interns, ...data } = existingProperty;
    try {
      const deletedProperty = await this.propertiesRepository.delete(id);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'DELETE PROPERTY',
        data,
        'SUCCESS',
      );
      return deletedProperty.affected;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO DELETE PROPERTY',
        data,
        'FAILED TO DELETE PROPERTY',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }

  async removeAll({ fullName, role, userId }: IRequestUser) {
    try {
      const allProperties = await this.propertiesRepository
        .createQueryBuilder('property')
        .leftJoinAndSelect('property.interns', 'intern')
        .getMany();
      const propertiesWithoutRelations = allProperties.filter(
        (p) => !p.interns.length,
      );

      if (propertiesWithoutRelations.length === 0)
        return 'No properties without relations to delete.';

      const properties = propertiesWithoutRelations.map((p) => p.id);
      await this.propertiesRepository.delete(properties);
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'DELETE ALL PROPERTIES',
        properties,
        'SUCCESS',
      );

      return `Deleted properties without relations: ${propertiesWithoutRelations
        .map((p) => p.name)
        .join(', ')}`;
    } catch (error) {
      await this.systemAuditsService.createSystemAudit(
        {
          id: userId,
          fullName,
          role,
        },
        'TRY TO DELETE ALL PROPERTIES',
        { id: null, data: 'Properties' },
        'FAILED TO DELETE ALL PROPERTIES',
        error.message,
      );
      handleInternalServerError(error.message);
    }
  }
}
