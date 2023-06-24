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
import { PostDto } from './dto';
import { Post as post } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  // TODO: Add CRUD operations for posts

  @Get('')
  getPosts() {
    return this.postService.getPosts();
  }

  @UseGuards(JwtGuard)
  @Post('new')
  createPost(@Body() dto: any) {
    console.log({ dto });
    return this.postService.createPost(dto);
  }

  @Get(':id')
  getPost(@Param() id: number) {
    console.log({ id });
    return this.postService.getPost(id);
  }

  @Patch(':id')
  updatePost(@Param() id: number, data: post) {
    return this.postService.updatePost(id, data);
  }

  @Delete(':id')
  deletePost(@Param() id: number) {
    return this.postService.deletePost(id);
  }
}
