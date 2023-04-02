import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Res,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { LocalFileService } from './local-file.service';
import { CreateLocalFileDto } from './dto/create-local-file.dto';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream } from 'fs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('local-file')
@Controller('local-file')
export class LocalFileController {
  constructor(private readonly localFileService: LocalFileService) {}

  @Post()
  create(@Body() createLocalFileDto: CreateLocalFileDto) {
    return this.localFileService.create(createLocalFileDto);
  }

  @Get(':id')
  async getFileById(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.localFileService.getFileById(id);
    if (!file) {
      throw new NotFoundException();
    }

    const stream = createReadStream(
      join(process.cwd(), file.path, file.filename),
    );

    response.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': file.mimetype,
    });

    return new StreamableFile(stream);
  }
}
