import { IsString, MinLength } from 'class-validator';

export class SearchUserDto {
  @IsString()
  @MinLength(2)
  query: string;
}
