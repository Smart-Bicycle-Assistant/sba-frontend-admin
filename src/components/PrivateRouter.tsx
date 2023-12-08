import { Route, Navigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';

const PrivateRouter = ({ element, ...rest }) => {
  const { isLoggedIn } = useUserStore();
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    alert('로그인이 필요한 기능입니다.');
  }

  return isLoggedIn ? <Route {...rest} element={element} /> : <Navigate to="/auth/login" replace />;
};

export default PrivateRouter;
