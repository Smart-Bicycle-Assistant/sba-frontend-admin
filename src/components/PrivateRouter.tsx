import { Navigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRouter = (element: any) => {
  if (localStorage.getItem('token') === null) {
    alert('로그인이 필요한 기능입니다.');
  }

  return localStorage.getItem('token') !== null ? element : <Navigate to="/auth/login" replace />;
};

export default PrivateRouter;
