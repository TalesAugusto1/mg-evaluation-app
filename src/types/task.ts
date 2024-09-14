import { User } from "@/types/user";
import { Project } from "@/types/project";

export interface Task {
  id: string;
  name: string;
  description: string;
  userId: string;
  projectId: string;
  user: User;
  project: Project;
}
