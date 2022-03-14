import { EquipmentModule } from './equipment/equipment.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import 'dotenv/config';

@Module({
  imports: [EquipmentModule, ManufacturerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
