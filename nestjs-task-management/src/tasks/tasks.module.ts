import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRespository } from './tasks.repository';

//Using a provider, we define a service within this module and this will allow this service to be injectable into the tasksController (it allows it to be injectable it is not the actual injecting). In turn this will allow us to access methods from this service within the Tasks Controller.
@Module({
  imports: [TypeOrmModule.forFeature([TasksRespository])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
