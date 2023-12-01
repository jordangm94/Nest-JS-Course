import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTaskById(id: string): Task {
    return this.tasks.find((task) => {
      return task.id === id;
    });
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto; //destructuring
    let tasks = this.getAllTasks();
    //do something with status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    //do something with search
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
    //return final result
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

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id); //Filter & keeps tasks not identical to id
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}

//REMEMBER: The service has the business logic and the controller is the entry point to the application.

//Tasks service will own the business logic and the controller will be the entry point to communicate with the service and return the result

//Good practice to set this as private so it cannot be accessed by other pieces of your app and accidentally mutated.

//So above the tasks is set as private but this method being public allows for the tasks to be accessed. Notice how we are specifiying a type for Task (from our model)
