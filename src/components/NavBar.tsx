import Logo from '../assets/Logo.svg?react';

const NavBar: React.FC = () => {
  return (
    <div className="w-60 bg-white">
      <div className="flex items-center justify-center gap-x-2 py-5">
        <Logo className="w-6 h-6" />
        <div className="text-2xl font-bold text-primary-default">S-BA</div>
      </div>
      <div className="text-sm">
        <div>
          <a href="/">
            <div className="py-3 px-6 bg-primary-100 border-r-4 border-primary-default">
              <p>Home</p>
            </div>
          </a>
          <a href="/user">
            <div className="py-3 px-6">
              <p>회원 관리</p>
            </div>
          </a>
          <a href="/report">
            <div className="py-3 px-6">
              <p>신고 관리</p>
            </div>
          </a>
        </div>
        <div>
          <a href="/auth/login">
            <div className="py-3 px-6">
              <p>로그인</p>
            </div>
          </a>
          <a href="/auth/signin">
            <div className="py-3 px-6">
              <p>회원가입</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
