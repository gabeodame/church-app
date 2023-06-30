import { Injectable, UseGuards } from '@nestjs/common';
import { Post, PostStatus, Prisma, User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto, PostFilterDto, TagDto, UpdatePostDto } from './dto';
import e from 'express';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(obj: { dto: PostDto; user: User }): Promise<Post> {
    const { dto, user } = obj;

    const { title, content, summary, tags } = dto;
    const authorId = user?.id;

    const data = { title, content, summary, authorId };

    try {
      //returns the created post
      return await this.prisma.post.create({
        data: {
          ...data,
          tags: {
            create: tags?.map((tag) => ({ name: tag })),
          },
        },
      });
    } catch (error) {
      //check if the error is a foreign key constraint error
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error(error.meta.target[0] + ' does not exist');
        }
      }
      throw new Error(error);
    }
  }

  getPosts(filterDto: PostFilterDto): Promise<Post[]> {
    //returns all posts
    if (Object.keys(filterDto).length) {
      const { search, tag, published } = filterDto;
      if (search) {
        return this.prisma.post.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                content: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          },
          include: {
            tags: true,
          },
        });
      }
      if (tag) {
        return this.prisma.post.findMany({
          where: {
            tags: {
              some: {
                name: tag,
              },
            },
          },
          include: {
            tags: true,
          },
        });
      }

      if (published) {
        //must provide enum value of 'DRAFT' or 'PUBLISHED' or 'ARCHIVED'
        const status = published.toUpperCase();
        return this.prisma.post.findMany({
          where: {
            published: status as PostStatus,
          },
        });
      }
    }
    return this.prisma.post.findMany();
  }

  async getPost(id: number): Promise<Post> {
    //returns the post with the given id
    return await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }

  @UseGuards(JwtGuard)
  async updatePost(id: number, data: Post): Promise<Post> {
    //**** */ //edge case if the user wants to update the tags

    // const updateData = { ...data, tags: [] };

    // if (data.tags) {
    //   const tags = data.tags;
    //   delete data.tags;

    //   //delete all tags associated with the post
    //   await this.prisma.tags.deleteMany({
    //     where: {
    //       postIds: id,
    //     },
    //   });

    //   //create new tags
    //   await this.prisma.tags.createMany({
    //     data: tags.map((tag) => ({ name: tag, postId: id })),
    //   });
    // }

    return await this.prisma.post.update({
      where: {
        id,
      },
      data,
    });
  }

  @UseGuards(JwtGuard)
  async deletePost(id: number): Promise<Post> {
    //returns the deleted post
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
