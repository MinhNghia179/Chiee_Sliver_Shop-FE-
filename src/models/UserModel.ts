export interface UserModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role_code: string;
  avatar:string;
  address:string;
  phone_number:string;
  status: boolean;
  access_token?:string;
}
