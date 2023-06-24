import { IsNotEmpty, IsString, IsArray, IsBoolean } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  tags?: string[];

  @IsBoolean()
  sermon?: boolean;

  @IsString()
  mainScripture?: string;

  @IsArray()
  subScripture?: string[];

  @IsArray()
  illustration?: string[];
}
