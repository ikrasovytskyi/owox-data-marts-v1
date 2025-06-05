import { DataStorageType } from '../../enums/data-storage-type.enum';

export class CreateDataMartCommand {
  constructor(
    public readonly title: string,
    public readonly storage: DataStorageType
  ) {}
}
