import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createTaskDto: CreateTaskDto) {
    await this.prisma.task.create({
      data: {
        userId: userId,
        title: createTaskDto.title,
        description: createTaskDto.description,
        deadline: createTaskDto.deadline,
        completed: createTaskDto.completed,
      },
    });

    return {
      message: 'Create task successfully',
    };
  }

  async findAll(userId: number) {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
    return {
      message: 'Get all task successfuly',
      data: tasks,
    };
  }

  async findOne(userId: number, id: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });
    return {
      message: 'Get task successfuly',
      data: task,
    };
  }

  async update(userId: number, id: number, updateTaskDto: UpdateTaskDto) {
    await this.prisma.task.update({
      data: {
        title: updateTaskDto.title,
        description: updateTaskDto.description,
        deadline: updateTaskDto.deadline,
        completed: updateTaskDto.completed,
      },
      where: {
        id: id,
        userId: userId,
      },
    });

    return {
      message: 'Update task successfully',
    };
  }

  async remove(userId: number, id: number) {
    await this.prisma.task.delete({
      where: {
        id: id,
        userId: userId,
      },
    });

    return {
      message: 'Delete task successfully',
    };
  }
}
