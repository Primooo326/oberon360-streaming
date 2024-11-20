import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DeviceService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getTreeDevice(token: string): Promise<string> {
    const baseUrl = this.configService.get('app.deviceTree.url');
    const url = `${baseUrl}?channelTypes=1,2,3,4,5,6,7,8,10,11,12,14,15,33&sort=&orgCode=`;
    const headers = { 'X-Subject-Token': token };

    try {
      const { data } = await this.httpService.get(url, { headers }).toPromise();
      const parsedData = JSON.parse(data);
      const channelId = parsedData.data.departments[0].channel[0].id;
      console.log('CHANNEL ID ->', channelId);
      return channelId;
    } catch (error) {
      console.error('Error al obtener el árbol de dispositivos:', error.message);
      throw error;
    }
  }
}