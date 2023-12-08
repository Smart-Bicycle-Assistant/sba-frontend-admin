import { ReportType } from '../types';

export const formatReport = (data: ReportType[]) => {
  const transformedData = data.reduce(
    (
      result: {
        [key: string]: {
          target: string;
          content: string[];
        };
      },
      entry
    ) => {
      const { target, content } = entry;

      if (!result[target]) {
        result[target] = { target, content: [] };
      }

      result[target].content.push(content);

      return result;
    },
    {}
  );

  return Object.values(transformedData);
};
