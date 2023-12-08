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
          content: [string, number][];
        };
      },
      entry
    ) => {
      const { target, content, time } = entry;

      if (!result[target]) {
        result[target] = { target, content: [] };
      }

      result[target].content.push([content, time]);

      return result;
    },
    {}
  );

  return Object.values(transformedData);
};
