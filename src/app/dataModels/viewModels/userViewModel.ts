import { PresidentType } from '../enums/presidentType';

export class UserViewModel {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  description: string;
  phoneNumber: string;
  isActive: boolean;
  isPresident?: PresidentType;
  groupAuthId?: number;
}
