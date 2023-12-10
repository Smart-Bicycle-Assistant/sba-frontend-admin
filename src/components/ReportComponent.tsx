import { ReportType } from '../types';
import { formatDate } from '../utils/format';

type ReportComponentProps = {
  report: ReportType;
  confirmModalHandler: (id: string, report: number[]) => void;
};

const ReportComponent: React.FC<ReportComponentProps> = ({ report, confirmModalHandler }) => {
  const { target, reporter, id, solved, content, time } = report;

  return (
    <div className="p-4 border-l-4 border-l-primary-default bg-slate-50 text-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <p>
            <span className="text-base pr-4">{target}</span>
          </p>
          <p>
            <span className="rounded-l-xl border-y border-l border-primary-default bg-primary-default text-primary-default text-white text-[10px] px-2 py-1">
              신고자
            </span>
            <span className="rounded-r-xl border-y border-r border-primary-default text-primary-default text-slate-800 text-[10px] px-2 py-1">
              {reporter}
            </span>
          </p>
        </div>
        {solved === 0 && (
          <button
            className="rounded-xl bg-rose-500 text-white px-3 py-1"
            onClick={() => confirmModalHandler(target, [id])}
          >
            신고 처리하기
          </button>
        )}
        {solved === 1 && (
          <button className="rounded-xl bg-slate-500 text-white px-3 py-1">신고 처리완료</button>
        )}
      </div>
      <div className="flex justify-between bg-white border border-slate-100 p-4 rounded-lg leading-normal">
        <p>{content}</p>
        <p className="flex items-end text-slate-400">{formatDate(time)}</p>
      </div>
    </div>
  );
};

export default ReportComponent;
