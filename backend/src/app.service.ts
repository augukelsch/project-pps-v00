import { Injectable } from '@nestjs/common';
import { readAllPart } from './storage/repositories/partListRepo';

@Injectable()
export class AppService {
  async getHello() {
    const data = await readAllPart()
    return data[0].description;
  }
}
