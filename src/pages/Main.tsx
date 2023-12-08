import { useUserStore } from '../stores/userStore';

const Main: React.FC = () => {
  const { isLoggedIn } = useUserStore();

  return (
    <div className="h-screen">
      <div className="m-8 p-8 bg-white rounded-xl">
        {isLoggedIn ? (
          <p className="text-xs text-slate-700">관리자 페이지입니다.</p>
        ) : (
          <p className="text-xs text-slate-700">관리자 로그인이 필요합니다.</p>
        )}
      </div>
    </div>
  );
};

export default Main;
