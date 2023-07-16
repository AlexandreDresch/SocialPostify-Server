import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/repository/users.repository';
import { PrismaUsersRepository } from 'src/users/repository/implementations/prismaUsers.repository';
import { AuthService } from 'src/auth/auth.service';
import { PostRepository } from './repository/post.repository';
import { PrismaPostRepository } from './repository/implementations/prismaPosts.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [PostController],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    AuthService,
    PostService,
    {
      provide: PostRepository,
      useClass: PrismaPostRepository,
    },
  ],
})
export class PostModule {}
