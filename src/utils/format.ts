import { ReportType } from '../types';

export const formatDate = (date: number) => {
  const ridingTime = new Date(date);

  const year = ridingTime.getFullYear();
  const month = ridingTime.getMonth() + 1;
  const day = ridingTime.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export const formatReport = (data: ReportType[]) => {
  const transformedData = data.reduce(
    (
      result: {
        [key: string]: {
          target: string;
          content: [string, number, number][];
          reportId: number[];
        };
      },
      entry
    ) => {
      const { id, target, content, time, solved } = entry;

      if (!result[target] && solved === 0) {
        result[target] = { target, content: [], reportId: [] };
      }

      if (solved === 0) {
        result[target].content.push([content, time, solved]);
        result[target].reportId.push(id);
      }

      return result;
    },
    {}
  );

  return Object.values(transformedData);
};
