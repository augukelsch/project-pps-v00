import { Injectable } from '@nestjs/common';
import { readOneByUsername } from 'src/storage/repositories/user.repositories';

export type User = any;

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | undefined> {
    const response = await readOneByUsername(username);
    return response
  }
}