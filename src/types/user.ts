import { Project } from "@/types/project";

import { Task } from "@/types/task";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  profilePicture?: Buffer;
  projects: Project[];
  tasks: Task[];
}
