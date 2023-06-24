import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtGuard } from '../auth/guard';
import { GetUser } from 'src/auth/decorator/get.user.decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
