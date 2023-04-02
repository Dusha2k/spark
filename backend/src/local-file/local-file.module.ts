import { Module } from '@nestjs/common';
import { LocalFileService } from './local-file.service';
import { LocalFileController } from './local-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalFileEntity } from './entities/local-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocalFileEntity])],
  controllers: [LocalFileController],
  providers: [LocalFileService],
  exports: [LocalFileService],
})
export class LocalFileModule {}
