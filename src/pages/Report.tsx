import NavBar from '../components/NavBar';
import { useState, useEffect } from 'react';
import { BanUserApi, ReportListAllApi, ReportListSuspiciousApi } from '../apis/report';
import { ReportType } from '../types';
import ConfirmModal from '../components/ConfirmModal';
import ReportComponent from '../components/ReportComponent';

const Report: React.FC = () => {
  const [reportList, setReportList] = useState<ReportType[]>([]);
  const [suspiciousList, setSuspiciousList] = useState<ReportType[]>([]);
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
      setSuspiciousList(res.data);
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
                  <ReportComponent report={report} confirmModalHandler={confirmModalHandler} />
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
