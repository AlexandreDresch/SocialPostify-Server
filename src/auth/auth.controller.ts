import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthSigninDto } from './dto/auth-signin-dto';
import { AuthService } from './auth.service';
import { AuthSignupDto } from './dto/auth-signup-dto';
import { AuthGuard } from './authGuard/auth.guard';
import { User } from '@prisma/client';
import { UserRequest } from './decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('sign-in')
  async signin(@Body() body: AuthSigninDto) {
    return this.authService.signin(body);
  }

  @Post('sign-up')
  async signup(@Body() body: AuthSignupDto) {
    return this.authService.signup(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async userLogged(@UserRequest() user: User) {
    return user;
  }
}
