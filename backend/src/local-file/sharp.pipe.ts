import { Injectable, PipeTransform, mixin } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';

export interface SharpPipeResponse {
  mimetype: string;
  path: string;
  filename: string;
}

export function SharpPipe(pathSubFolder: string) {
  @Injectable()
  class SharpPipeClass
    implements PipeTransform<Express.Multer.File, Promise<SharpPipeResponse>>
  {
    async transform(image: Express.Multer.File): Promise<SharpPipeResponse> {
      const originalName = path.parse(image.originalname).name;
      const filename = Date.now() + '-' + originalName + '.webp';
      await sharp(image.buffer)
        .resize(800)
        .webp({ effort: 3 })
        .toFile(path.join(`uploadedFiles${pathSubFolder}`, filename));

      return {
        mimetype: 'image/webp',
        filename,
        path: `uploadedFiles${pathSubFolder}`,
      };
    }
  }

  return mixin(SharpPipeClass);
}
