import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import { ManufacturerRepository } from './manufacturer.repository';
import { Module } from '@nestjs/common';
import { EquipmentRepository } from 'src/equipment/equipment.repository';

@Module({
  imports: [],
  controllers: [ManufacturerController],
  providers: [ManufacturerService, ManufacturerRepository, EquipmentRepository],
})
export class ManufacturerModule {}
