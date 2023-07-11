import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(data: CreateUserDto) {
    const hashPassword = bcrypt.hashSync(data.password, 10);

    const user = await this.usersRepository.findByEmail(data.email);

    if (user) {
      throw new HttpException('User already exists.', HttpStatus.CONFLICT);
    }

    return await this.usersRepository.create({
      ...data,
      password: hashPassword,
    });
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
