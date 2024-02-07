import { TaskStatus } from '../tasks-status.enum';
import { IsEnum } from 'class-validator';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus) //This validates that the status value is one of the values in the TaskStatus enum
  status: TaskStatus;
}
