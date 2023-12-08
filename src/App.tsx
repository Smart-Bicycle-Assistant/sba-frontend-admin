import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage, SigninPage, ReportPage, MainPage } from './pages';
import NavBar from './components/NavBar';
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
    path: '/report',
    element: <ReportPage />,
  },
]);

function App() {
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
