import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

//App module is root entry point of application and we are importing the task module within this root.

//Nest JS CLI allows us to generate schematics, a module is a schematic
//Generate a Module: nest g module "name"
//Generate a Controller: nest g controller tasks --no-spec Note: Nest JS when generating a controller generates a spec file for testing, dont need atm.

////////////Questions but what is a MODULE....

@Module({
  imports: [TasksModule],
})
export class AppModule {}
