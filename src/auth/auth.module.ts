import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/users/repository/users.repository';
import { PrismaUsersRepository } from 'src/users/repository/implementations/prismaUsers.repository';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { PostService } from 'src/post/post.service';
import { PostRepository } from 'src/post/repository/post.repository';
import { PrismaPostRepository } from 'src/post/repository/implementations/prismaPosts.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    PostService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: PostRepository,
      useClass: PrismaPostRepository,
    },
  ],
})
export class AuthModule {}
