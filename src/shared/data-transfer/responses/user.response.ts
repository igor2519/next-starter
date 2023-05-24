import type { UserRole, UserStatus } from '@/shared/constants';

export interface IFullUserResponse {
  id: string;
  name: string | null;
  status: UserStatus;
  email: string;
  role: UserRole;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}
