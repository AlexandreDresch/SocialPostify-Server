import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from 'src/auth/authGuard/auth.guard';
import { UserRequest } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post('publication')
  create(@Body() body: CreatePostDto, @UserRequest() user: User) {
    return this.postService.create(body, user.id);
  }

  @UseGuards(AuthGuard)
  @Get('publications')
  findByUserId(@UserRequest() user: User) {
    return this.postService.findByUserId(user.id);
  }
}
