export type LoginType = {
  id: string;
  password: string;
};

export type RegisterType = LoginType & {
  nickname: string;
  email: string;
};
