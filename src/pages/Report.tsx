import NavBar from '../components/NavBar';
import { useState, useEffect } from 'react';
import { BanUserApi, ReportListAllApi, ReportListSuspiciousApi } from '../apis/report';
import { ReportType, SuspiciousType } from '../types';
import ConfirmModal from '../components/ConfirmModal';
import ReportComponent from '../components/ReportComponent';
import { formatReport } from '../utils/format';

const Report: React.FC = () => {
  const [reportList, setReportList] = useState<ReportType[]>([]);
  const [suspiciousList, setSuspiciousList] = useState<SuspiciousType[]>([]);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [banUser, setBanUser] = useState<string>('');

  const getReportListAll = async () => {
    const res = await ReportListAllApi();
    console.log(res);

    if (res.status === 200) {
      setReportList(res.data);
    }
  };

  const getReportListSuspicious = async () => {
    const res = await ReportListSuspiciousApi();
    console.log(res);

    if (res.status === 200) {
      console.log(formatReport(res.data));
      setSuspiciousList(formatReport(res.data));
    }
  };

  const processBanUser = async () => {
    const res = await BanUserApi(banUser);
    console.log(res);

    if (res.status === 200) {
      setConfirmModal(false);
    }
  };

  const confirmModalHandler = (id: string) => {
    setConfirmModal(true);
    setBanUser(id);
  };

  useEffect(() => {
    getReportListAll();
    getReportListSuspicious();
  }, []);

  return (
    <div className="flex">
      <NavBar />
      <div className="w-full h-full p-8">
        <div className="p-8 bg-white rounded-xl">
          <div className="text-xl font-semibold">신고 관리</div>
          <div className="flex flex-col gap-y-6 py-6">
            <div>
              <p className="text-base font-semibold pb-1">악성 신고 보기</p>
              <p className="text-xs text-slate-400">신고를 3개 이상 받은 유저가 표시됩니다.</p>
            </div>
            {suspiciousList &&
              suspiciousList.map((report, idx) => (
                <div key={idx}>
                  <div className="p-4 border-l-4 border-l-primary-default bg-slate-50 text-xs">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <p>
                          <span className="text-base pr-4">{report.target}</span>
                        </p>
                      </div>
                      <button
                        className="rounded-xl bg-rose-500 text-white px-3 py-1"
                        onClick={() => confirmModalHandler(report.target)}
                      >
                        신고 처리하기
                      </button>
                    </div>
                    <div className="flex flex-col gap-y-1">
                      {report.content &&
                        report.content.map((el) => (
                          <p className="bg-white border border-slate-100 p-4 rounded-lg leading-normal">
                            {el}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-y-6 py-6">
            <p className="text-base font-semibold">전체 신고 보기</p>
            {reportList &&
              reportList.map((report, idx) => (
                <div key={idx}>
                  <ReportComponent report={report} confirmModalHandler={confirmModalHandler} />
                </div>
              ))}
          </div>
          {confirmModal && (
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 rounded-lg">
              <div className="flex flex-col gap-y-3 animate-fade-in-down">
                <ConfirmModal
                  setOpenModal={setConfirmModal}
                  deleteHandler={processBanUser}
                  user={banUser}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
