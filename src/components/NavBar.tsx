import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';

import Logo from '../assets/Logo.svg?react';

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn, setLoggedOut } = useUserStore();

  return (
    <div className="relative">
      {open && (
        <div className="w-60 bg-white h-full">
          <div className="flex items-center justify-center gap-x-2 py-5">
            <Logo className="w-6 h-6" />
            <div className="text-2xl font-bold text-primary-default">S-BA</div>
          </div>
          <div className="text-sm">
            <div>
              <Link to="/">
                <div
                  className={`py-3 px-6 ${
                    location.pathname === '/' && `bg-primary-100 border-r-4 border-primary-default`
                  }`}
                >
                  <p>Home</p>
                </div>
              </Link>
              <Link to="/user">
                <div
                  className={`py-3 px-6 ${
                    location.pathname === '/user' &&
                    `bg-primary-100 border-r-4 border-primary-default`
                  }`}
                >
                  <p>회원 관리</p>
                </div>
              </Link>
              <Link to="/report">
                <div
                  className={`py-3 px-6 ${
                    location.pathname === '/report' &&
                    `bg-primary-100 border-r-4 border-primary-default`
                  }`}
                >
                  <p>신고 관리</p>
                </div>
              </Link>
            </div>
            {isLoggedIn ? (
              <div>
                <div
                  className="py-3 px-6"
                  onClick={() => {
                    localStorage.clear();
                    setLoggedOut();
                    navigate('/auth/login');
                  }}
                >
                  <p>로그아웃</p>
                </div>
              </div>
            ) : (
              <div>
                <Link to="/auth/login">
                  <div
                    className={`py-3 px-6 ${
                      location.pathname === '/auth/login' &&
                      `bg-primary-100 border-r-4 border-primary-default`
                    }`}
                  >
                    <p>로그인</p>
                  </div>
                </Link>
                <Link to="/auth/signin">
                  <div
                    className={`py-3 px-6 ${
                      location.pathname === '/auth/signin' &&
                      `bg-primary-100 border-r-4 border-primary-default`
                    }`}
                  >
                    <p>회원가입</p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      {open ? (
        <div
          className="fixed left-[15rem] top-1/2 translate-y-[-50%] bg-white py-8 rounded-r-lg"
          onClick={() => setOpen(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16">
            <path d="M453-276 249-480l204-204 20 20-184 184 184 184-20 20Zm238 0L487-480l204-204 20 20-184 184 184 184-20 20Z" />
          </svg>
        </div>
      ) : (
        <div
          className="fixed left-0 top-1/2 translate-y-[-50%] bg-white py-8 rounded-r-lg"
          onClick={() => setOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16">
            <path d="M433-480 249-664l20-20 204 204-204 204-20-20 184-184Zm238 0L487-664l20-20 204 204-204 204-20-20 184-184Z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default NavBar;
