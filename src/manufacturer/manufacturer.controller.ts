/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { Equipment } from 'src/equipment/equipment.entity';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { Manufacturer } from './manufacturer.entity';
import { ManufacturerService } from './manufacturer.service';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private manufacturerService: ManufacturerService) {}

  @Get()
  public async getAllManufacturers(): Promise<Manufacturer[]> {
    return await this.manufacturerService.getManufacturers();
  }

  @Get('/:id/equipment')
  public async getEquipmentsByManufacturerId(
    @Param('id') id: string,
  ): Promise<Equipment[]> {
    return this.manufacturerService.getEquipmentsByManufacturer(id);
  }

  @Get('/:id')
  public async read(@Param('id') id: string): Promise<Manufacturer> {
    return await this.manufacturerService.readById(id);
  }

  @Post()
  public async createNewManufacturer(
    @Body('') payload: CreateManufacturerDto,
  ): Promise<Manufacturer> {
    return await this.manufacturerService.createManufacturer(payload);
  }

  @Patch('/:id')
  public async updateManufacturer(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<Manufacturer> {
    return await this.manufacturerService.updateManufacturer({ id, name });
  }

  @Delete('/:id')
  public async deleteManufacturer(@Param('id') id: string): Promise<void> {
    await this.manufacturerService.deleteManufacturer(id);
  }
}
