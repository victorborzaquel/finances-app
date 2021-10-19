interface IUser {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  created_at: Date;
  avatar: string;
}

export {
  IUser
}