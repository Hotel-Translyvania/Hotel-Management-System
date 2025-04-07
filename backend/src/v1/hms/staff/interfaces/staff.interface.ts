// src/hms/staff/interfaces/staff.interface.ts
// import { Role } from '../../../auth/enums/role.enum';

export interface IStaff {
  id: string;
  name: string;
  // role: Role;
  email: string;
  status: 'available' | 'working' | 'on_break';
  currentTask?: string;
  assignedRoomId?: string;
  salary: number;
  createdAt: Date;
  updatedAt: Date;
  hotelId: string;
}

export interface IStaffResponse {
  success: boolean;
  message?: string;
  data?: IStaff | IStaff[];
}

export interface IStaffQueryOptions {
  hotelId: string;
  // role?: Role;
  status?: string;
  activeOnly?: boolean;
  page?: number;
  limit?: number;
}