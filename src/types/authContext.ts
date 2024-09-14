export interface AuthContextType {
  isAuthenticated: boolean;
  userId?: string;
  token?: string;
  name?: string;
  login: (token: string, name: string, userId: string) => void;
  logout: () => void;
}
