import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from 'src/decorator/route-params.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User() user: RequestUser, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(user.userId, createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@User() user: RequestUser) {
    return this.taskService.findAll(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@User() user: RequestUser, @Param('id') id: string) {
    return this.taskService.findOne(user.userId, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @User() user: RequestUser,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(user.userId, +id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@User() user: RequestUser, @Param('id') id: string) {
    return this.taskService.remove(user.userId, +id);
  }
}
