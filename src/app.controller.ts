import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { GpsService } from './modules/gps/gps.service';
import { DeviceService } from './modules/device/device.service';
import { VideoService } from './modules/video/video.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private gpsService: GpsService,
    private deviceService: DeviceService,
    private videoService: VideoService,
    private appService: AppService,
  ) {}

  @Get('init')
  async runMainFlow() {
    console.log('Ejecutando flujo principal');
    
    try {
      const token = await this.authService.authenticate();
      await this.gpsService.getLastGpsLocation(token);
      const channelId = await this.deviceService.getTreeDevice(token);
      await this.videoService.startVideo(token, channelId);
      return { message: 'Flujo principal completado con éxito' };
    } catch (error) {
      console.error('Error en el flujo principal:', error.message);
      throw error;
    }
  }
  @Get()
  async main() {
    console.log('Ejecutando flujo principal');
    return this.appService.getHello();
  }
}
