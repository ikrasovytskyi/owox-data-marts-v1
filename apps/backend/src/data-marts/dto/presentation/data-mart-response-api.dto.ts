import { DataStorageType } from '../../enums/data-storage-type.enum';

export class DataMartResponseApiDto {
  id: string;
  title: string;
  storageType: DataStorageType;
  createdAt: Date;
  modifiedAt: Date;
}
