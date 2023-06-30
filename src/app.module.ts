import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
// import { MembershipModule } from './membership/membership.module';
import { ServicesModule } from './services/services.module';
import { AttendanceModule } from './attendance/attendance.module';
import { GivingModule } from './giving/giving.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
// import { PostController } from './post/post.controller';
// import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    ServicesModule,
    AttendanceModule,
    GivingModule,
    PrismaModule,
    PostModule,
    GroupModule,
  ],
})
export class AppModule {}
