import {
  AdminID,
  ManagerID,
  UserID,
} from '../../../../common/types/entity-ids.type';

export interface IUserData {
  userId: UserID | ManagerID | AdminID;
  email: string;
  role: string;
  deviceId: string;
}
