import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

//App module is root entry point of application and we are importing the task module within this root.

//Nest JS CLI allows us to generate schematics, a module is a schematic
//Generate a Module: nest g module "name"
//Generate a Controller: nest g controller tasks --no-spec Note: Nest JS when generating a controller generates a spec file for testing, dont need atm.

////////////Questions but what is a MODULE....

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true, //this will load all entities in the app.module.ts
      synchronize: true, //Keeps DB schema in sync | This will sync the entities with the database
    }),
  ],
})
export class AppModule {}
