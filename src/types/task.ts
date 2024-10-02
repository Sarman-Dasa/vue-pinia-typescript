// Enum to represent different stages of a task
export enum TaskStage {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date | String;
  priority: 'Low' | 'Medium' | 'High'; 
  category?: string;
  stage: TaskStage;
  createdAt: Date| String;
  updatedAt: Date | String;
}
  