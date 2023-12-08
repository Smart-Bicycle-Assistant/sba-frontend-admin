import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage, SigninPage, ReportPage, MainPage, UserPage } from './pages';
import NavBar from './components/NavBar';
import { useUserStore } from './stores/userStore';
import { useToken } from './stores/tokenStore';
import './App.css';

const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
  {
    path: '/auth/signin',
    element: <SigninPage />,
  },
  {
    path: '/user',
    element: <UserPage />,
  },
  {
    path: '/report',
    element: <ReportPage />,
  },
]);

function App() {
  const { setLoggedIn } = useUserStore((state) => state);
  const { setToken } = useToken((state) => state);

  const refreshData = async () => {
    if (localStorage.getItem('token') === null) {
      return;
    }

    setToken(localStorage.getItem('token') as string);
    setLoggedIn();
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="flex">
      <NavBar />
      <div className="w-full h-screen bg-slate-100">
        <RouterProvider router={ROUTER} />
      </div>
    </div>
  );
}

export default App;
