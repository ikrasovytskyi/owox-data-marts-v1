import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateDataMartRequestApiDto } from '../dto/presentation/create-data-mart-request-api.dto';
import { CreateDataMartResponseApiDto } from '../dto/presentation/create-data-mart-response-api.dto';
import { DataMartResponseApiDto } from '../dto/presentation/data-mart-response-api.dto';

import { DataMartMapper } from '../mappers/data-mart.mapper';
import { ListDataMartsService } from '../use-cases/list-data-marts.service';
import { GetDataMartService } from '../use-cases/get-data-mart.service';
import { CreateDataMartService } from '../use-cases/create-data-mart.service';

@Controller('data-marts')
export class DataMartController {
  constructor(
    private readonly createDataMartService: CreateDataMartService,
    private readonly listDataMartsService: ListDataMartsService,
    private readonly getDataMartService: GetDataMartService,
    private readonly mapper: DataMartMapper
  ) {}

  @Post()
  async create(@Body() dto: CreateDataMartRequestApiDto): Promise<CreateDataMartResponseApiDto> {
    const command = this.mapper.toDomainCommand(dto);
    const result = await this.createDataMartService.run(command);
    return this.mapper.toCreateResponse(result);
  }

  @Get()
  async list(): Promise<DataMartResponseApiDto[]> {
    const dataMarts = await this.listDataMartsService.run();
    return this.mapper.toResponseList(dataMarts);
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<DataMartResponseApiDto> {
    const dataMart = await this.getDataMartService.run(id);
    return this.mapper.toResponse(dataMart);
  }
}
