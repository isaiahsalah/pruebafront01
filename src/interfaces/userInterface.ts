export interface UserInterface {
  id?: number | null;
  name: string;
  birthDate: Date;
  profession: string;
  nationality: string;
  phone: string;
  email: string;
  salary: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
