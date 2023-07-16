import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Equals,
  IsDateString,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsDateString()
  dateToPublish: Date;

  @IsBoolean()
  @Equals(false)
  published: boolean;

  @IsString()
  @IsNotEmpty()
  socialMedia: string;

  userId: number;
}
