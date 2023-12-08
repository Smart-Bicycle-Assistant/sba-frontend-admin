import request from './request';
import { handleApiError } from './errorHandling';

export const ReportListAllApi = async () => {
  try {
    const response = await request.get(`report/get_all_reports`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
