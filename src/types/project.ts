import { User } from "@/types/user";
import { Task } from "@/types/task";
export interface Project {
  id: string;
  name: string;
  description: string;
  userId: string;
  user: User;
  tasks: Task[];
}
