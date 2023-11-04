interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "CUSTOMER";
    address: string;
    phone: string;
  }
  export type { User };