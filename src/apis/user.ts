import member_request from './request';
import { LoginType, RegisterType } from '../types';
import { handleApiError } from './errorHandling';

export const LoginApi = async (params: LoginType) => {
  try {
    const response = await member_request.post(`/manager/login`, params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// export const RefreshApi = async () => {
//   try {
//     const res = await request.get(`/member/get_user_info`);
//     return res.data;
//   } catch (err) {
//     return handleApiError(err);
//   }
// };

export const RegisterApi = async (params: RegisterType) => {
  try {
    const response = await member_request.post('/manager/register', params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const ValidIdApi = async (id: string) => {
  try {
    const response = await member_request.get(`/manager/id_available/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
