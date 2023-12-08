import request from './request';
import { handleApiError } from './errorHandling';

export const UserListAllApi = async () => {
  try {
    const response = await request.get(`report/get_all_user`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const ReportListAllApi = async () => {
  try {
    const response = await request.get(`report/get_all_reports`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const ReportListSuspiciousApi = async () => {
  try {
    const response = await request.get(`/report/get_suspicious_users`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const BanUserApi = async (id: string) => {
  try {
    const response = await request.post(`/report/ban_user?memberId=${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
