//This model defines the shape of the data that we want to store in our application. It is a simple typescript interface that defines the shape of our data. We will use this model to create tasks in our application.

export interface Task {
  id: string;

  title: string;

  description: string;

  status: TaskStatus; //For the status property of our task, we only allow one of the values from our TaskStatus enum.
}

export enum TaskStatus {
  OPEN = 'OPEN',

  IN_PROGRESS = 'IN_PROGRESS',

  DONE = 'DONE',
}

//A model in nest js can be defined as a class or an interface. An interface is a typescript concept that simply enforces the shape of an object upon compilation, after compilation not preserved.

//Classes will be preserved, they are useful when you want to create multiple instances of the same shape.
