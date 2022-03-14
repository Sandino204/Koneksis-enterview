import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateEquipmentDto {
  @IsNotEmpty({ message: 'Id cannot be empty' })
  @IsUUID(4, { message: 'Id invalid' })
  id: string;

  @IsNotEmpty({ message: 'model cannot be empty' })
  @IsString({ message: 'model needs to be a string' })
  @MaxLength(255, { message: 'model exeded max length' })
  model: string;

  @IsNotEmpty({ message: 'serialNumber cannot be empty' })
  @IsString({ message: 'serialNumber needs to be a string' })
  serialNumber: string;

  @IsUUID(4, { message: 'invalid UUID' })
  @IsNotEmpty({ message: 'manufacturerId cannot be empty' })
  manufacturerId: string;
}
