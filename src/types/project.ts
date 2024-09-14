export interface Project {
  id: number;
  name: string;
  description: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}
