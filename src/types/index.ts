export type LoginType = {
  id: string;
  password: string;
};

export type RegisterType = LoginType & {
  nickname: string;
  email: string;
};

export type ReportType = {
  id: number;
  reporter: string;
  target: string;
  time: number;
  content: string;
  solved: number;
};

export type SuspiciousType = {
  target: string;
  content: [string, number, number][];
  reportId: number[];
};

export type UserType = {
  id: number;
  password: string;
  nickname: string;
  email: number;
  bicycleNumber: string;
  banned: number;
};
