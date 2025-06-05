import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataMart } from '../entities/data-mart.entity';
import { DataStorageService } from '../services/data-storage.service';
import { DataMartMapper } from '../mappers/data-mart.mapper';
import { CreateDataMartCommand } from '../dto/domain/create-data-mart.command';
import { DataMartDto } from '../dto/domain/data-mart.dto';

@Injectable()
export class CreateDataMartService {
  constructor(
    @InjectRepository(DataMart)
    private readonly dataMartRepository: Repository<DataMart>,
    private readonly dataStorageService: DataStorageService,
    private readonly mapper: DataMartMapper
  ) {}

  async run(command: CreateDataMartCommand): Promise<DataMartDto> {
    const storage = await this.dataStorageService.findOrCreateByType(command.storage);

    const dataMart = this.dataMartRepository.create({
      title: command.title,
      storage,
    });

    const newDataMart = await this.dataMartRepository.save(dataMart);

    return this.mapper.toDomainDto(newDataMart);
  }
}
