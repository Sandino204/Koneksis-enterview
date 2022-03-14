/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Equipment } from './equipment.entity';
import { EquipmentRepository } from './equipment.repository';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { ManufacturerRepository } from '../manufacturer/manufacturer.repository';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { validate as uuidValidate } from 'uuid';
import { Manufacturer } from '../manufacturer/manufacturer.entity';

@Injectable()
export class EquipmentService {
  constructor(
    private equipmentRepository: EquipmentRepository,
    private manufacturerRepository: ManufacturerRepository,
  ) {}

  public async getEquipments(): Promise<Equipment[]> {
    return this.equipmentRepository.getAll();
  }

  public async readById(id: string): Promise<Equipment> {
    if (!uuidValidate(id)) throw new BadRequestException(`id not valid`);

    const found = await this.equipmentRepository.getById(id);

    if (!found) throw new NotFoundException(`Equipment not found`);

    return found;
  }

  public async getManufacturerByEquipment(id: string): Promise<Manufacturer> {
    if (!uuidValidate(id)) throw new BadRequestException(`id not valid`);

    const foundEquipment = await this.equipmentRepository.getById(id);

    if (!foundEquipment) throw new NotFoundException(`Equipment not found`);

    const foundManufacturer = await this.manufacturerRepository.getById(
      foundEquipment.manufacturer_id,
    );

    return foundManufacturer;
  }

  public async createEquipment(payload: CreateEquipmentDto) {
    const { manufacturerId } = payload;
    const findManufacturer =
      this.manufacturerRepository.getById(manufacturerId);

    if (!findManufacturer)
      throw new NotFoundException('Manufacturer not found');

    const findModel = this.equipmentRepository.getByModel(payload.model);

    if (!findModel)
      throw new BadRequestException(`Equipment model already exists`);

    return this.equipmentRepository.create(payload);
  }

  public async updateEquipment(payload: UpdateEquipmentDto) {
    const foundEquipment = await this.equipmentRepository.getById(payload.id);

    if (!foundEquipment) throw new NotFoundException('equipment not found');

    const foundManufacturer = await this.manufacturerRepository.getById(
      payload.manufacturerId,
    );

    if (!foundManufacturer)
      throw new NotFoundException('Invalid ManufacturerId');

    return await this.equipmentRepository.update({
      id: payload.id,
      model: payload.model,
      manufacturerId: payload.manufacturerId,
      serialNumber: payload.serialNumber,
    });
  }

  public async deleteEquipment(id: string): Promise<void> {
    if (!uuidValidate(id)) throw new BadRequestException(`id not valid`);

    const found = await this.equipmentRepository.getById(id);

    if (!found) throw new NotFoundException(`Equipment not found`);

    await this.equipmentRepository.delete(id);
  }
}
