import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from '../../dto/create-post.dto';
import { PostRepository } from '../post.repository';

@Injectable()
export class PrismaPostRepository implements PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePostDto) {
    await this.prisma.posts.create({ data: data });
  }

  async findByUserId(userId: number) {
    return await this.prisma.posts.findMany({ where: { userId } });
  }

  async findByTitle(title: string) {
    return await this.prisma.posts.findFirst({ where: { title } });
  }
}
