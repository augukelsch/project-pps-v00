import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { createUser } from '../../storage/repositories/user.repositories';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn( username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register( username: string, email: string, password: string, hidden: Boolean,  ){
    const user = await this.usersService.findOne(username);
    if (user?.username === username) {
      throw new UnauthorizedException();
    }
    const payload:CreateUserDto = {
      username: username, email: email, password: password, hidden: hidden
    };
    
    const query = await createUser(payload);
    return query
  }
}