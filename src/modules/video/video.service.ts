import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VideoService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async startVideo(token: string, channelId: string) {
    const baseUrl = this.configService.get('app.video.url');
    const url = `${baseUrl}?token=${token}`;
    const body = {
      data: { dataType: '3', streamType: '2', channelId }
    };
    const headers = { 'X-Subject-Token': token };

    try {
      const { data } = await this.httpService.post(url, body, { headers }).toPromise();
      console.log('Video iniciado:', data);
      return data;
    } catch (error) {
      console.error('Error al iniciar el video:', error.message);
      throw error;
    }
  }
}