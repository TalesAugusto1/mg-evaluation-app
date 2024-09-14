import { User } from "@/types/user";
import { Project } from "@/types/project";

export interface Task {
  assignedUserId: string;
  dueDate: string;
  status: string;
  updatedAt: string | number | Date;
  createdAt: string | number | Date;
  id: string;
  name: string;
  description: string;
  userId: string;
  projectId: string;
  user: User;
  project: Project;
}
