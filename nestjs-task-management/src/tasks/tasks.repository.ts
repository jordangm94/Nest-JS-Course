//A repository is just a class!

import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status.enum';

@EntityRepository(Task)
export class TasksRespository extends Repository<Task> {
  async createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = CreateTaskDto;

    //Create task object based on our repository
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    //Tell repository to handle operation of saving it into table in DB
    await this.save(task);
    return task;
  }
}
