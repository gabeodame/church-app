import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthSignInDto, AuthSignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthSignUpDto) {
    try {
      console.log(dto);
      //generate password hash
      const passwordHash = await argon.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          password: passwordHash,
          dob: new Date(dto?.dob?.length ? dto.dob : null),
          bio: dto.bio.length ? dto.bio : '',
          gender: dto?.gender?.length ? dto.gender : '',
        },
      });

      //return user without password hash
      // return user;
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log(error);
        if (error.code === 'P2002') {
          throw new ForbiddenException('Username or email already exists');
        }
      }
      throw new Error(error.message);
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
