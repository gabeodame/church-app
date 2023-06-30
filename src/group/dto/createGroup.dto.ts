import { User } from '@prisma/client';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  members?: GroupMembersDto[];
}

export class UpdateGroupDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  members?: GroupMembersDto[];
}

export class GroupMembersDto {
  username: string;
  email: string;
  id: number;
}
