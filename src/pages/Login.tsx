import useInput from '../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { LoginApi } from '../apis/user';
import { useToken } from '../stores/tokenStore';
import { useUserStore } from '../stores/userStore';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { value: id, onChange: onIdChange, setValue: setId } = useInput();
  const { value: password, onChange: onPasswordChange, setValue: setPassword } = useInput();

  const { setLoggedIn } = useUserStore();
  const { setToken } = useToken();

  const onSubmit = async () => {
    if (id === '' || password === '') {
      return;
    }

    try {
      const res = await LoginApi({ id, password });
      if (res.message === 'OK') {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        setLoggedIn();
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setId('');
      setPassword('');
    }
  };

  const handleEnterKey = (event: { key: string }) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="bg-white m-8 rounded-xl">
      <div className="py-[10vh]">
        <div className="flex items-center justify-center">
          <div className="flex flex-col">
            <input
              placeholder="아이디"
              className="w-96 px-3 py-3 text-xs bg-slate-50 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={id}
              onChange={onIdChange}
              onKeyDown={handleEnterKey}
            />

            <input
              placeholder="비밀번호"
              className="w-96 px-3 py-3 mt-4 text-xs bg-slate-50 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={password}
              onChange={onPasswordChange}
              onKeyDown={handleEnterKey}
              autoComplete="current-password"
            />
            <button
              className="bg-primary-default font-medium text-sm text-white py-2.5 px-4 mt-10 rounded-lg hover:bg-opacity-80"
              onClick={onSubmit}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
