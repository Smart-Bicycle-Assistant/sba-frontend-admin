import { ReportType } from '../types';

type ReportComponentProps = {
  report: ReportType;
  confirmModalHandler: (id: string) => void;
};

const ReportComponent: React.FC<ReportComponentProps> = ({ report, confirmModalHandler }) => {
  return (
    <div className="p-4 border-l-4 border-l-primary-default bg-slate-50 text-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
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
        <button
          className="rounded-xl bg-rose-500 text-white px-3 py-1"
          onClick={() => confirmModalHandler(report.target)}
        >
          신고 처리하기
        </button>
      </div>
      <p className="bg-white border border-slate-100 p-4 rounded-lg leading-normal">
        {report.content}
      </p>
    </div>
  );
};

export default ReportComponent;
