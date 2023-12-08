import Logo from '../assets/Logo.svg?react';

const NavBar: React.FC = () => {
  return (
    <div className="w-60 bg-white">
      <div className="flex items-center gap-x-1">
        <Logo className="w-6 h-6" />
        <div className="text-2xl font-bold text-primary-default">S-BA</div>
      </div>
      <p>회원 관리</p>
      <p>신고 관리</p>
      <p>로그인</p>
      <p>회원가입</p>
    </div>
  );
};

export default NavBar;
