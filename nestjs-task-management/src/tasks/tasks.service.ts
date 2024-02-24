import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRespository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRespository) //This allows us to inject the database repository into the service
    private tasksRepository: TasksRespository,
  ) {}

  //Below this is saying this method will return a promise of type Task. Any asynchornous methods return a promise!
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with id '${id}' not found`); //nestJS tool to return an error 404 if not found
    }

    return found;
  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto; //destructuring
  //   let tasks = this.getAllTasks();
  //   //do something with status
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   //do something with search
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  //   //return final result
  // }

  createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(CreateTaskDto);
  }

  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id); //Filter & keeps tasks not identical to id
  // }
  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}

//REMEMBER: The service has the business logic and the controller is the entry point to the application.

//Tasks service will own the business logic and the controller will be the entry point to communicate with the service and return the result

//Good practice to set this as private so it cannot be accessed by other pieces of your app and accidentally mutated.

//So above the tasks is set as private but this method being public allows for the tasks to be accessed. Notice how we are specifiying a type for Task (from our model)

//////

//Notice how we didn't have to change anything in the controller, only this service, when it came to not found task id error handle. This is because the controller is the entry point to the application and the service is where the business logic is. So we can handle the error in the service and the controller will just return the result.
