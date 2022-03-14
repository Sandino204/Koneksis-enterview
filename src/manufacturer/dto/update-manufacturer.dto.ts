import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateManufacturerDto {
  @IsNotEmpty({ message: 'Id cannot be empty' })
  @IsUUID(4, { message: 'Id invalid' })
  id: string;

  @IsNotEmpty({ message: 'name cannot be empty' })
  @IsString({ message: 'name needs to be a string' })
  @MaxLength(255, { message: 'name exeded max length' })
  name: string;
}
