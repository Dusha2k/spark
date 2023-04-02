import { Injectable } from '@nestjs/common';
import { CreateLocalFileDto } from './dto/create-local-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalFileEntity } from './entities/local-file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocalFileService {
  constructor(
    @InjectRepository(LocalFileEntity)
    private readonly localFileRepository: Repository<LocalFileEntity>,
  ) {}
  create(createLocalFileDto: CreateLocalFileDto) {
    return this.localFileRepository.save(createLocalFileDto);
  }

  getFileById(id: number) {
    return this.localFileRepository.findOneBy({ id });
  }
}
