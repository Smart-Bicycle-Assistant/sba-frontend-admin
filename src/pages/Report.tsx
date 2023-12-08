import { useEffect } from 'react';
import { ReportListAllApi } from '../apis/report';

const Report: React.FC = () => {
  const getReportListAll = async () => {
    const res = await ReportListAllApi();
    console.log(res);
  };

  useEffect(() => {
    getReportListAll();
  }, []);

  return (
    <div className="m-8 p-8 bg-white rounded-xl">
      <div className="text-xl font-semibold">신고 관리</div>
    </div>
  );
};

export default Report;
