
export interface Doctors {
  doctorId: number;
  firstName: string;
  lastName: string;
  specialty: string;
  phone?: string;
  email?: string;
  photo?: string;
  bio?: string;
  workingHours?: string;
  passwordHash: string;
}
