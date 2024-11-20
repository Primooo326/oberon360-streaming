import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  apiBaseUrl: 'https://201.184.24.83:8443',
  auth: {
    url: '/admin/API/accounts/authorize',
    username: 'THOMAS',
    password: 'thomas2024*', // Usar variables de entorno en producción
  },
  gps: {
    url: '/vehicleServer/gps/getLastLocation',
  },
  deviceTree: {
    url: '/admin/API/tree/deviceOrg',
  },
  video: {
    url: '/admin/API/MTS/Video/StartVideo',
  },
}));