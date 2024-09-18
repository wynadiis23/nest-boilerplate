import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Updated. Testing Release';
  }

  getReleaseV2(): string {
    return 'Release Endpoint Update';
  }

  newFeature(): string {
    return 'New Feature';
  }
}
