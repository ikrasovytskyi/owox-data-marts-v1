import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataMart } from './entities/data-mart.entity';
import { DataStorage } from './entities/data-storage.entity';
import { DataMartController } from './controllers/data-mart.controller';
import { DataStorageService } from './services/data-storage.service';
import { CreateDataMartService } from './use-cases/create-data-mart.service';
import { ListDataMartsService } from './use-cases/list-data-marts.service';
import { GetDataMartService } from './use-cases/get-data-mart.service';
import { DataMartMapper } from './mappers/data-mart.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([DataMart, DataStorage])],
  controllers: [DataMartController],
  providers: [
    DataStorageService,
    CreateDataMartService,
    ListDataMartsService,
    GetDataMartService,
    DataMartMapper,
  ],
})
export class DataMartsModule {}
