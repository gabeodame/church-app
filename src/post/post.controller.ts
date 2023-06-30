import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto, PostFilterDto, UpdatePostDto } from './dto';
import { User, Post as post } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  // TODO: Add CRUD operations for posts

  @Get()
  getPosts(@Body() filterDto: PostFilterDto): Promise<post[]> {
    return this.postService.getPosts(filterDto);
  }

  @UseGuards(JwtGuard)
  @Post()
  createPost(@Body() dto: PostDto, @GetUser() user: User): Promise<post> {
    const data = { dto, user };
    return this.postService.createPost(data);
  }

  @Get('/:id')
  getPost(@Param('id') id: number): Promise<post> {
    const postId = Number(id);
    return this.postService.getPost(postId);
  }

  @Patch('/:id')
  updatePost(@Param('id') id: number, @Body() data: post): Promise<post> {
    const postId = Number(id);
    return this.postService.updatePost(postId, data);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: number) {
    const postId = Number(id);
    return this.postService.deletePost(postId);
  }
}
