import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(CreateTaskDto: CreateTaskDto): Task {
    const { title, description } = CreateTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}

//REMEMBER: The service has the business logic and the controller is the entry point to the application.

//Tasks service will own the business logic and the controller will be the entry point to communicate with the service and return the result

//Good practice to set this as private so it cannot be accessed by other pieces of your app and accidentally mutated.

//So above the tasks is set as private but this method being public allows for the tasks to be accessed. Notice how we are specifiying a type for Task (from our model)
