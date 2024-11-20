import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { HttpModule } from '../http/http.module';

@Module({
  imports: [HttpModule],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService], // Si necesitas usar VideoService en otros módulos
})
export class VideoModule {}
