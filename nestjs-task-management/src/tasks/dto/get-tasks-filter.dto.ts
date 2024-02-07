import { TaskStatus } from '../tasks.model';
import { IsEnum, IsString, IsOptional } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional() //Optional question marks apparently won't exist at run time (given typescript) which is when we use validation pipeline I think, so need to use IsOptional
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
