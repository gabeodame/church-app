import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto, AuthSignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  // User sign up
  @Post('signup')
  signUp(@Body() dto: AuthSignUpDto) {
    // console.log({ dto });
    return this.AuthService.signUp(dto);
  }
  // User sign in
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() dto: AuthSignInDto) {
    return this.AuthService.signIn(dto);
  }
  // User sign out
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signOut() {
    return this.AuthService.signOut();
  }
  // User change password /auth/reset-password
  @Patch('reset-password')
  changePassword() {
    return this.AuthService.changePassword();
  }

  @Get('profile')
  getProfile() {
    return this.AuthService.getProfile();
  }
}
