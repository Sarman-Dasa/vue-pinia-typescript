import { type Task, TaskStage } from "@/types/task";

const todoList: Task[] = [
    {
      id: '1',
      title: 'Complete the project report',
      description: 'Finalize and submit the project report by the end of the week.',
      completed: false,
      dueDate: '2024-10-07',
      priority: 'High',
      category: 'Work',
      stage: TaskStage.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),  
    },
    {
      id: '2',
      title: 'Grocery shopping',
      description: 'Buy groceries for the week including fruits, vegetables, and dairy products.',
      completed: false,
      dueDate: '2024-10-04',
      priority: 'Medium',
      category: 'Personal',
      stage: TaskStage.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: 'Schedule doctor appointment',
      description: 'Book an appointment with the dentist for a check-up.',
      completed: false,
      dueDate: '2024-10-15',
      priority: 'Medium',
      category: 'Health',
      stage: TaskStage.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      title: 'Prepare presentation for the meeting',
      description: 'Create slides for the upcoming team meeting on project updates.',
      completed: true,
      dueDate: '2024-10-10',
      priority: 'High',
      category: 'Work',
      stage: TaskStage.DONE,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '5',
      title: 'Read the new book',
      description: 'Start reading the new novel I bought last week.',
      completed: false,
      dueDate: '2024-10-20',
      priority: 'Low',
      category: 'Personal',
      stage: TaskStage.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '6',
      title: 'Workout at the gym',
      description: 'Go to the gym for a workout session in the evening.',
      completed: false,
      dueDate: '2024-10-03',
      priority: 'Medium',
      category: 'Health',
      stage: TaskStage.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '7',
      title: 'Finish coding assignment',
      description: 'Complete the coding assignment for the online course.',
      completed: false,
      dueDate: '2024-10-05',
      priority: 'High',
      category: 'Education',
      stage: TaskStage.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '8',
      title: 'Plan weekend trip',
      description: 'Research and plan a trip for the weekend getaway.',
      completed: false,
      dueDate: '2024-10-08',
      priority: 'Medium',
      category: 'Personal',
      stage: TaskStage.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '9',
      title: 'Clean the garage',
      description: 'Organize and clean the garage space.',
      completed: false,
      dueDate: '2024-10-12',
      priority: 'Low',
      category: 'Home',
      stage: TaskStage.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '10',
      title: 'Update website content',
      description: 'Refresh the content on the company website.',
      completed: true,
      dueDate: '2024-10-01',
      priority: 'High',
      category: 'Work',
      stage: TaskStage.DONE,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '11',
      title: 'Attend yoga class',
      description: 'Participate in the weekly yoga class on Saturday morning.',
      completed: false,
      dueDate: '2024-10-07',
      priority: 'Medium',
      category: 'Health',
      stage: TaskStage.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '12',
      title: 'Buy birthday gift',
      description: 'Purchase a gift for a friend’s birthday.',
      completed: false,
      dueDate: '2024-10-18',
      priority: 'High',
      category: 'Personal',
      stage: TaskStage.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '13',
      title: 'Complete tax filing',
      description: 'Finish filing taxes before the deadline.',
      completed: false,
      dueDate: '2024-10-15',
      priority: 'High',
      category: 'Finance',
      stage: TaskStage.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '14',
      title: 'Prepare for job interview',
      description: 'Research the company and practice interview questions.',
      completed: false,
      dueDate: '2024-10-14',
      priority: 'Medium',
      category: 'Career',
      stage: TaskStage.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '15',
      title: 'Fix the leaky faucet',
      description: 'Repair the kitchen faucet that is leaking.',
      completed: false,
      dueDate: '2024-10-09',
      priority: 'Low',
      category: 'Home',
      stage: TaskStage.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '16',
      title: 'Send out invitations for the party',
      description: 'Send invitations for the upcoming birthday party.',
      completed: true,
      dueDate: '2024-10-02',
      priority: 'High',
      category: 'Personal',
      stage: TaskStage.DONE,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '17',
      title: 'Volunteer at the shelter',
      description: 'Spend a few hours volunteering at the local animal shelter.',
      completed: false,
      dueDate: '2024-10-11',
      priority: 'Medium',
      category: 'Community',
      stage: TaskStage.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '18',
      title: 'Organize family photos',
      description: 'Sort and organize family photos into albums.',
      completed: false,
      dueDate: '2024-10-16',
      priority: 'Low',
      category: 'Personal',
      stage: TaskStage.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '19',
      title: 'Research vacation destinations',
      description: 'Look into potential vacation spots for the upcoming holiday.',
      completed: false,
      dueDate: '2024-10-30',
      priority: 'Medium',
      category: 'Travel',
      stage: TaskStage.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '20',
      title: 'Learn new programming language',
      description: 'Start learning Python through online tutorials.',
      completed: false,
      dueDate: '2024-11-01',
      priority: 'High',
      category: 'Education',
      stage: TaskStage.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];
  
  export default todoList;