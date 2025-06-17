import { DataStorageType } from '../../data-storage-types/enums/data-storage-type.enum';
import { DataMartDefinition } from '../schemas/data-mart-table-definitions/data-mart-definition';
import { DataMartDefinitionType } from '../../enums/data-mart-definition-type.enum';

export class DataMartDto {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly storageType: DataStorageType,
    public readonly createdAt: Date,
    public readonly modifiedAt: Date,
    public readonly definitionType?: DataMartDefinitionType,
    public readonly definition?: DataMartDefinition,
    public readonly description?: string
  ) {}
}
