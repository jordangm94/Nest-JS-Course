import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './tasks.model';

//Define entities using classes

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid') //This will generate a unique id for each task and treat id as primary key
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
