import { Role } from "./enums";

export type User = {
  id: string;
  email?: string;
  phoneNo?:string
  firstName?: string;
  lastName?: string;

};

export type CreateUserStatus = {
  message: string;
  data: User;
};

export type createUserInput = {
  email: string;
  phoneNo: string;
  role: [Role];
  deviceToken: string;
};

export type userUpdate = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
};

export type Status = {
  status: boolean;
  message: string;
  token?: string;
};

export type PasswordStatus = {
  status: boolean;
  message: string;
  otp?: string;
};
export type token = {
  message: string;
  token: string;
};

export type LoginStatus = {
  message: string;
  accessToken: string;
  refreshToken:string;
  data: User;
};

export enum Branch {
  CurrentBranch = "CurrentBranch",
  AllBranch = "AllBranch",
}

export type updateUserInput = {
  firstName?: string
  lastName?: string
  profileImage?: string
}

export interface JwtPayload {
  id: string;
  email:string;
  role:string[]
}


