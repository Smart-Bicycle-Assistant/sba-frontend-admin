import NavBar from '../components/NavBar';
import { useEffect, useState } from 'react';
import { UserListAllApi } from '../apis/report';
import { UserType } from '../types';

const User: React.FC = () => {
  const [userList, setUserList] = useState<UserType[]>([]);

  const getUserListAll = async () => {
    const res = await UserListAllApi();
    console.log(res);

    if (res.status === 200) {
      setUserList(res.data);
    }
  };

  useEffect(() => {
    getUserListAll();
  }, []);

  const banMessage = (banned: number) => {
    if (banned === -1) {
      return <button className="bg-emerald-100 text-emerald-500 px-1 py-0.5 rounded">정상</button>;
    } else {
      const date = new Date(banned);

      if (date < new Date()) {
        return (
          <button className="bg-emerald-100 text-emerald-500 px-1 py-0.5 rounded">정상</button>
        );
      }

      return (
        <div>
          <button className="bg-red-100 text-red-500 px-1 py-0.5 rounded">일시 정지</button>
          <p className="pt-1 text-[8px] text-slate-400 leading-tight">
            (~{date.getMonth() + 1}월 {date.getDate()}일 {date.getHours()}시간 {date.getMinutes()}분{' '}
            {date.getSeconds()}초)
          </p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen">
      <NavBar />
      <div className="w-full h-full p-8">
        <div className="p-8 bg-white rounded-xl">
          <div className="text-xl font-semibold pb-6">회원 관리</div>
          <div className="flex items-center bg-primary-100 text-sm text-center py-3 mb-1">
            <p className="w-[20%]">아이디</p>
            <p className="w-[20%]">닉네임</p>
            <p className="w-[40%]">이메일</p>
            <p className="w-[10%]">자전거</p>
            <p className="w-[10%]">정지 여부</p>
          </div>
          {userList &&
            userList.map((user) => (
              <div className="flex items-center text-sm text-center py-3">
                <p className="w-[20%]">{user.id}</p>
                <p className="w-[20%]">{user.nickname}</p>
                <p className="w-[40%]">{user.email}</p>
                <p className="w-[10%]">{user.bicycleNumber}대</p>
                <p className="w-[10%]">{banMessage(user.banned)}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default User;
