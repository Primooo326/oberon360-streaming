import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async authenticate(): Promise<string> {
    const firstAuthResponse = await this.performFirstAuth();
    return this.performSecondAuth(firstAuthResponse);
  }

  private async performFirstAuth() {
    const url = this.configService.get('app.auth.url');
    const body = {
      userName: this.configService.get('app.auth.username'),
      ipAddress: '92.168.1.228',
      clientType: 'WINPC_V1',
    };
    const { data } = await this.httpService.post(url, body).toPromise();
    return data;
  }

  private async performSecondAuth({ realm, randomKey, encryptType, publickey }) {
    const url = this.configService.get('app.auth.url');
    const signature = this.calculateSignature(realm, randomKey);
    const body = {
      mac: 'f4:b1:c2:d6:dd:c7',
      signature,
      userName: this.configService.get('app.auth.username'),
      randomKey,
      publicKey: publickey,
      encryptType,
      ipAddress: '92.168.1.228',
      clientType: 'WINPC_V1',
      userType: '0',
    };
    const { data } = await this.httpService.post(url, body).toPromise();
    return data.token;
  }

  private calculateSignature(realm: string, randomKey: string): string {
    const password = this.configService.get('app.auth.password');
    const username = this.configService.get('app.auth.username');
    let temp = this.md5(password);
    temp = this.md5(username + temp);
    temp = this.md5(temp);
    temp = this.md5(`${username}:${realm}:${temp}`);
    return this.md5(`${temp}:${randomKey}`);
  }

  private md5(data: string): string {
    return createHash('md5').update(data).digest('hex');
  }
}