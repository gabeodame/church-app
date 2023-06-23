import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthSignInDto, AuthSignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthSignUpDto) {
    try {
      //generate password hash
      const passwordHash = await argon.hash(dto.password);
      //save user in db
      console.log(passwordHash);
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          password: passwordHash,
          // Specify user properties here
        },
      });

      //return user without password hash
      // return user;
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Username or email already exists');
        }
      }
      throw new Error('Could not create user');
    }
  }

  async signIn(dto: AuthSignInDto) {
    //find user by username
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    //if no user throw error
    if (!user) {
      throw new ForbiddenException(
        'Could not sign you in. Please check your credentials',
      );
    }

    //compare password hash
    const isPasswordValid = await argon.verify(user.password, dto.password);

    //if password is invalid throw error
    if (!isPasswordValid) {
      throw new ForbiddenException(
        'Could not sign you in. Please check your credentials',
      );
    }

    //return user without password hash
    return this.signToken(user.id, user.email);
  }

  signOut() {
    return { message: 'Sign out' };
  }

  changePassword() {
    return { message: 'Change password' };
  }

  getProfile() {
    return { message: 'Get profile' };
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const secret = this.config.get('JWT_SECRET');

    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret,
    });
    return {
      access_token: token,
    };
  }
}
