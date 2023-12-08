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
      return <p>정상</p>;
    } else {
      return <p>일시 정지</p>;
    }
  };

  return (
    <div className="m-8 p-8 bg-white rounded-xl">
      <div className="text-xl font-semibold">회원 관리</div>
      <div className="flex items-center">
        <p>아이디</p>
        <p>닉네임</p>
        <p>이메일</p>
        <p>자전거 대수</p>
        <p>정지 여부</p>
      </div>
      {userList &&
        userList.map((user) => (
          <div className="flex items-center">
            <p>{user.id}</p>
            <p>{user.nickname}</p>
            <p>{user.email}</p>
            <p>{user.bicycleNumber}</p>
            <p>{banMessage(user.banned)}</p>
          </div>
        ))}
    </div>
  );
};

export default User;
