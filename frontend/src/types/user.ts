export interface User {
    id: string;
    login: string;
    name:string;
    role: "admin" | "client";
  }
  