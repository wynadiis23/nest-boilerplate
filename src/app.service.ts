import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Updated. Testing Release';
  }

  getRelease(): string {
    return 'Release Endpoint Update';
  }
}
