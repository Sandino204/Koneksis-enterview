import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ManufacturerRepository } from '../manufacturer/manufacturer.repository';
import { EquipmentRepository } from './equipment.repository';

@Module({
  imports: [],
  controllers: [EquipmentController],
  providers: [EquipmentService, ManufacturerRepository, EquipmentRepository],
})
export class EquipmentModule {}
