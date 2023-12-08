import { useState, useEffect } from 'react';
import { ReportListAllApi } from '../apis/report';

type ReportType = {
  id: number;
  reporter: string;
  target: string;
  time: number;
  content: string;
};

const Report: React.FC = () => {
  const [reportList, setReportList] = useState<ReportType[]>([]);

  const getReportListAll = async () => {
    const res = await ReportListAllApi();
    console.log(res);

    if (res.status === 200) {
      setReportList(res.data);
    }
  };

  useEffect(() => {
    getReportListAll();
  }, []);

  return (
    <div className="m-8 p-8 bg-white rounded-xl">
      <div className="text-xl font-semibold">신고 관리</div>
      <div className="flex flex-col gap-y-6 py-6">
        {reportList &&
          reportList.map((report, idx) => (
            <div key={idx} className="p-4 border-l-4 border-l-primary-default bg-slate-50 text-xs">
              <div className="flex items-center mb-4">
                <p>
                  <span className="text-base pr-4">{report.target}</span>
                </p>
                <p>
                  <span className="rounded-l-xl border-y border-l border-primary-default bg-primary-default text-primary-default text-white text-[10px] px-2 py-1">
                    신고자
                  </span>
                  <span className="rounded-r-xl border-y border-r border-primary-default text-primary-default text-slate-800 text-[10px] px-2 py-1">
                    {report.reporter}
                  </span>
                </p>
              </div>
              <p className="bg-white border border-slate-100 p-4 rounded-lg">{report.content}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Report;
