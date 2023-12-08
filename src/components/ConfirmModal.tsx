type ConfirmModalProps = {
  setOpenModal: (state: boolean) => void;
  deleteHandler: () => void;
  user: string;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({ setOpenModal, deleteHandler, user }) => {
  const confirmHandler = () => {
    deleteHandler();
    setOpenModal(false);
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="px-12 py-8 text-center">
        <p className="text-base font-semibold pb-1">신고를 처리하시겠습니까?</p>
        <p className="text-xs text-slate-500">
          <span className="text-primary-default font-semibold">{user}</span> 회원이 벤 처리됩니다.
          이 작업은 되돌릴 수 없습니다.
        </p>
      </div>
      <div className="w-full grid grid-cols-2">
        <button
          className="rounded-bl-lg bg-primary-default text-xs text-white hover:bg-primary-900 py-2.5"
          onClick={confirmHandler}
        >
          확인
        </button>
        <button
          className="rounded-br-lg bg-slate-400 text-xs text-white hover:bg-primary-900 py-2.5"
          onClick={() => setOpenModal(false)}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
