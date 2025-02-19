import { User } from "../types/user";

class UserService {
    async createAccount(username: string, email: string, password: string): Promise<User> {
      try {
        const response = await fetch("http://localhost:8000/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, email, password }),
        });
  
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.detail || "Error while creating account.");
        }
  
        const createdUser = await response.json();
        return createdUser;
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Network error.";
        console.error("Error while creating account:", errorMessage);
        throw new Error(errorMessage);
      }
    }

    async getUsername(): Promise<string> {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Token not found.');
        }
  
        const response = await fetch("http://localhost:8000/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.detail || "Error while fetching username.");
        }
  
        const user = await response.json();
        return user.username;
        
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Network error.";
        console.error("Error while fetching username:", errorMessage);
        throw new Error(errorMessage);
      }
    }
  }

export default new UserService();
  
