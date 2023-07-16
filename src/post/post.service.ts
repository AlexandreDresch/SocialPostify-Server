import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './repository/post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}
  async create(data: CreatePostDto, userId: number) {
    const post = await this.postRepository.findByTitle(data.title);

    if (post) {
      throw new HttpException(
        'This post has already been created',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const date = new Date(data.dateToPublish);

    await this.postRepository.create({ ...data, userId, dateToPublish: date });
  }

  async findByUserId(userId: number) {
    return await this.postRepository.findByUserId(userId);
  }
}
