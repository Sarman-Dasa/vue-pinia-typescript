// Enum to represent different stages of a task
export enum TaskStage {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date | string;
  priority: 'Low' | 'Medium' | 'High'; 
  category?: string;
  stage: TaskStage;
  createdAt: Date| string;
  updatedAt: Date | string;
}
  