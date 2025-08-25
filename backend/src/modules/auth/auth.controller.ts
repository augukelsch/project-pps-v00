import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard, Public } from './auth.guard';
import { AuthService } from './auth.service';
import { deleteOneByUsername, readAllUser, updateOneById } from '../../storage/repositories/user.repositories';
import { UpdateUserDto } from '../dto/user.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerDto: Record<string, any>) {
    return this.authService.register(registerDto.username, registerDto.email, registerDto.password, registerDto.hidden);
  }

  @Delete('user/delete/:username')
  @HttpCode(200)
  async remove(@Param('username') username) {
      const data = await deleteOneByUsername(username);
      if(data == "This Username does not Exist, try a different Username!" ){
          throw new HttpException('Bad Request! Check if the ID Exist!', HttpStatus.BAD_REQUEST);
      }
      return data;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  
  @UseGuards(AuthGuard)
  @Get('users')
  async getAllUsers() {
    const response = await readAllUser();
    return response;
  }
  
  @Patch('user/change/:id')
  @HttpCode(200)
  async updateUser(@Param('id') id,@Body() updateUserDto: UpdateUserDto) {
      let data = await updateOneById(id,updateUserDto);
      if(data == "This User ID does not Exist, try a different ID!" ){
          throw new HttpException('Bad Request! Check if the ID Exist!', HttpStatus.BAD_REQUEST);
      }
      if(data == "This field cannot be Changed!" ){
          throw new HttpException('Bad Request! Field cannot be modified!', HttpStatus.FORBIDDEN);
      }
      const response = {
          "User Updated Successfully!": {
              data
          }
      }
      return response;
  }
}