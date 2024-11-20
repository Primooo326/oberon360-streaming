import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GpsService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getLastGpsLocation(token: string) {
    const url = this.configService.get('app.gps.url');
    const body = { deviceCodeList: ['1000002'] };
    const headers = { 'X-Subject-Token': token };

    try {
      const { data } = await this.httpService.post(url, body, { headers }).toPromise();
      if (data.success) {
        console.log('Última ubicación de GPS obtenida con éxito:', data.result);
        return data.result;
      } else {
        console.error('Error al obtener la ubicación de GPS:', data.message);
        return null;
      }
    } catch (error) {
      console.error('Error en la solicitud GPS:', error.message);
      return null;
    }
  }
}