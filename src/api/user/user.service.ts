import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  }

  async createUser({
    username,
    password,
  }: Prisma.UserUncheckedCreateWithoutTasksInput) {
    const { id } = await this.prisma.user.create({
      data: { username, password },
    });

    return id;
  }
}
