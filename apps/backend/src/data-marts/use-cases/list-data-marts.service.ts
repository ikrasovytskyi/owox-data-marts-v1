import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataMart } from '../entities/data-mart.entity';
import { DataMartMapper } from '../mappers/data-mart.mapper';
import { DataMartDto } from '../dto/domain/data-mart.dto';

@Injectable()
export class ListDataMartsService {
  constructor(
    @InjectRepository(DataMart)
    private readonly dataMartRepo: Repository<DataMart>,
    private readonly mapper: DataMartMapper
  ) {}

  async run(): Promise<DataMartDto[]> {
    const entities = await this.dataMartRepo.find();
    return this.mapper.toDomainDtoList(entities);
  }
}
