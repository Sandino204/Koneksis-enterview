/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Manufacturer } from 'src/manufacturer/manufacturer.entity';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { Equipment } from './equipment.entity';
import { EquipmentService } from './equipment.service';

@Controller('equipment')
export class EquipmentController {
  constructor(private equipmentService: EquipmentService) {}

  @Get('')
  getAllEquipments(): Promise<Equipment[]> {
    return this.equipmentService.getEquipments();
  }

  @Get('/:id/manufacturer')
  getManufacturerByEquipment(@Param('id') id: string): Promise<Manufacturer> {
    return this.equipmentService.getManufacturerByEquipment(id);
  }

  @Get('/:id')
  read(@Param('id') id: string): Promise<Equipment> {
    return this.equipmentService.readById(id);
  }

  @Post('')
  createNewEquipment(@Body() payload: CreateEquipmentDto): Promise<Equipment> {
    return this.equipmentService.createEquipment(payload);
  }

  @Patch('/:id')
  updateEquipment(
    @Param('id') id: string,
    @Body('model') model: string,
    @Body('serialNumber') serialNumber: string,
    @Body('manufacturerId') manufacturerId: string,
  ): Promise<Equipment> {
    return this.equipmentService.updateEquipment({
      id,
      model,
      serialNumber,
      manufacturerId,
    });
  }

  @Delete(':id')
  deleteEquipment(@Param('id') id: string): Promise<void> {
    return this.equipmentService.deleteEquipment(id);
  }
}
