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

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    try {
      const newProperty = this.propertyRepository.create(createPropertyDto);
      return await this.propertyRepository.save(newProperty);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }

  async findAll() {
    try {
      const properties = await this.propertyRepository.find();
      return properties;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async findOne(id: string) {
    const property = await this.propertyRepository.findOne({
      where: { id },
    });
    if (!property) throw new NotFoundException('Property not found.');
    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    await this.findOne(id);
    try {
      const propertyToUpdate = await this.propertyRepository.preload({
        id,
        ...updatePropertyDto,
      });
      return await this.propertyRepository.save(propertyToUpdate);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException(`${RESOURCE_NAME_ALREADY_EXISTS}`);
      handleInternalServerError(error.message);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      const deletedProperty = await this.propertyRepository.delete(id);
      return deletedProperty.affected;
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }

  async removeAll() {
    try {
      await this.propertyRepository.delete({});
    } catch (error) {
      handleInternalServerError(error.message);
    }
  }
}
