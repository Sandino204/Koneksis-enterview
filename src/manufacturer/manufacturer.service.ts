/*
https://docs.nestjs.com/providers#services
*/

import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { Manufacturer } from './manufacturer.entity';
import { Equipment } from '../equipment/equipment.entity';
import { EquipmentRepository } from '../equipment/equipment.repository';
import { ManufacturerRepository } from './manufacturer.repository';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Injectable()
export class ManufacturerService {
  constructor(
    private manufacturerRepository: ManufacturerRepository,
    private equipmentRepository: EquipmentRepository,
  ) {}

  public async getManufacturers(): Promise<Manufacturer[]> {
    return await this.manufacturerRepository.getAll();
  }

  public async readById(id: string): Promise<Manufacturer> {
    if (!uuidValidate(id)) throw new BadRequestException(`id not valid`);

    const found = await this.manufacturerRepository.getById(id);

    if (!found) {
      throw new NotFoundException(`Manufacturer not found`);
    }

    return found;
  }

  public async getEquipmentsByManufacturer(id: string): Promise<Equipment[]> {
    if (!uuidValidate(id)) throw new BadRequestException(`id not valid`);

    const found = await this.equipmentRepository.getByManufacturer(id);

    if (!found) throw new NotFoundException(`Manufacturer not found`);

    return found;
  }

  public async createManufacturer(
    payload: CreateManufacturerDto,
  ): Promise<Manufacturer> {
    const { name } = payload;

    const exists = await this.manufacturerRepository.getByName(name);
    if (exists !== null)
      throw new NotAcceptableException(`This manufacturer already exists`);

    return await this.manufacturerRepository.create(name);
  }

  public async updateManufacturer(
    payload: UpdateManufacturerDto,
  ): Promise<Manufacturer> {
    const found = await this.manufacturerRepository.getById(payload.id);

    if (!found) throw new NotFoundException(`Manufacturer not found`);

    return await this.manufacturerRepository.update(payload);
  }

  public async deleteManufacturer(id: string): Promise<void> {
    if (!uuidValidate(id)) throw new BadRequestException(`id not valid`);

    const found = await this.manufacturerRepository.getById(id);

    if (!found) throw new NotFoundException(`Manufacturer not found`);

    await this.manufacturerRepository.delete(id);
  }
}
