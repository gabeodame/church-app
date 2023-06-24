import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MembershipModule } from './membership/membership.module';
import { ServicesModule } from './services/services.module';
import { AttendanceModule } from './attendance/attendance.module';
import { GivingModule } from './giving/giving.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    MembershipModule,
    ServicesModule,
    AttendanceModule,
    GivingModule,
    PrismaModule,
    PostModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class AppModule {}
