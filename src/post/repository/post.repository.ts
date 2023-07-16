import { Posts } from '@prisma/client';
import { CreatePostDto } from '../dto/create-post.dto';

export abstract class PostRepository {
  abstract create(data: CreatePostDto): Promise<void>;
  abstract findByUserId(userId: number): Promise<Posts[]>;
  abstract findByTitle(title: string): Promise<Posts>;
}
