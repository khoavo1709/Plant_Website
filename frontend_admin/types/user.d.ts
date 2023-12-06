interface User {
    id: string;
    name: string;
    email: string;
    full_name: string;
    password: string;
    role: "ADMIN" | "EMPLOYEE";
    gender: "MALE" | "FEMALE" | 'ORTHER';
    address: string;
    mobile: string;
  }
  export type { User };
  