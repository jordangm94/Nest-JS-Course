import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    //if we have any filters defined, call tasksService.getTasksWithFilters
    //Otherwise just get all tasks

    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
      //..
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id') //Colon tells nestJs id will be path parameter, extracted from parameter passed to handler
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(CreateTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}

//A controllers job is to receive a request, delegate it to whatever is needed to achieve the goal and return the response.

//This is the actual injecting of the tasks service into the controller

//Whenever a get request comes into the tasks route, this handler will handle that request specifically by calling the getAllTasks method from the tasks service.

//Important Notes:
//Defining an end point in nest js is as simple as creating a controller and defining a route handler using a decorator that indicates the http method that we want to use.

//Similar naming such as getAllTasks in the Controller and getAllTasks in the service is not mandatory, it just makes sense to give them the same name

//We don't do everything (I.e. the service stuff as well) all in the controlelr because as application grows it would become unmangeable. So we seperate the business logic from the controller and put it in the service. The controller is the entry point to the application and the service is where the business logic is handled.
