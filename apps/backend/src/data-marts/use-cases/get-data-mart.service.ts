import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataMart } from '../entities/data-mart.entity';
import { DataMartMapper } from '../mappers/data-mart.mapper';
import { DataMartDto } from '../dto/domain/data-mart.dto';

@Injectable()
export class GetDataMartService {
  constructor(
    @InjectRepository(DataMart)
    private readonly dataMartRepo: Repository<DataMart>,
    private readonly mapper: DataMartMapper
  ) {}

  async run(id: string): Promise<DataMartDto> {
    const entity = await this.dataMartRepo.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException(`DataMart with id '${id}' not found`);
    }

    return this.mapper.toDomainDto(entity);
  }
}
