import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DataStorageType } from '../../enums/data-storage-type.enum';

export class CreateDataMartRequestApiDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(DataStorageType)
  storage: DataStorageType;
}
