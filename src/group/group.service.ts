import { Injectable } from '@nestjs/common';
import { CreateGroupDto, UpdateGroupDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async create(createGroupDto: CreateGroupDto) {
    const data = {
      name: createGroupDto.name,
      description: createGroupDto.description,
    };
    return await this.prisma.group.create({
      data: {
        ...data,
        // members: {
        //   create: createGroupDto.members.length
        //     ? createGroupDto.members?.map((member) => ({
        //         id: member.id,
        //         email: member.email,
        //         username: member.username,
        //       }))
        //     : [],
        // },
      },
    });
  }

  findAll() {
    return this.prisma.group.findMany();
  }

  findOne(id: number) {
    return this.prisma.group.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.prisma.group.update({
      where: {
        id,
      },
      data: {
        name: updateGroupDto.name,
        description: updateGroupDto.description,
        // members: {
        //   create: updateGroupDto.members?.map((member, idx) => {
        //     this.prisma.user
        //       .findMany({
        //         where: {
        //           id: member.id,
        //         },
        //       })
        //       .then((users) => ({
        //         email: users[idx].email,
        //         username: users[idx].username,
        //         password: null,
        //       }));
        //   }),
        // },
        // include: {
        //   members: true,
        //   group: true,
        // },
      },
    });
  }

  updateMembers(id: number, members: any) {
    return this.prisma.group.update({
      data: {
        members: {
          create: members?.map((member) => ({
            email: member.email,
            username: member.username,
            password: null,
          })),
        },
      },
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.group.delete({
      where: {
        id,
      },
    });
  }
}
