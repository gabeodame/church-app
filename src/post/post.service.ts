import { Injectable, UseGuards } from '@nestjs/common';
import { Post } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  createPost(dto: PostDto) {
    try {
      return this.prisma.post.create({
        data: dto,
      });
      return { message: 'success' };
    } catch (error) {
      console.log(error);
    }
  }

  getPosts() {
    return this.prisma.post.findMany();
  }

  getPost(id: number) {
    console.log({ id });
    // return this.prisma.post.findUnique({
    //   where: {
    //     id,
    //   },
    // });
  }

  @UseGuards(JwtGuard)
  updatePost(id: number, data: Post) {
    return this.prisma.post.update({
      where: {
        id,
      },
      data,
    });
  }

  @UseGuards(JwtGuard)
  deletePost(id: number) {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
