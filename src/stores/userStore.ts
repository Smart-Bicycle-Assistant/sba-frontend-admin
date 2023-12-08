import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  nickname: string;
  isLoggedIn: boolean;
  setUser: (user: userProps) => void;
  setLoggedIn: () => void;
  setLoggedOut: () => void;
}

interface userProps {
  id: string;
  email: string;
  nickname: string;
}

export const useUserStore = create<User>()(
  devtools((set) => ({
    id: '',
    email: '',
    nickname: '',
    isLoggedIn: false,
    setUser: (user: userProps) => {
      set(() => ({
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      }));
    },
    setLoggedIn: () => set(() => ({ isLoggedIn: true })),
    setLoggedOut: () => set(() => ({ isLoggedIn: false })),
  }))
);
