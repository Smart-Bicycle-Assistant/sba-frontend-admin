import NavBar from '../components/NavBar';
import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useValidate from '../components/ValidationMessage';
import { RegisterApi, ValidIdApi } from '../apis/user';

const Signin: React.FC = () => {
  const navigate = useNavigate();

  const { value: id, onChange: onIdChange } = useInput();
  const { value: password, onChange: onPasswordChange } = useInput();
  const { value: check, onChange: onCheckChange } = useInput();
  const { value: nickname, onChange: onNameChange } = useInput();
  const { value: emailId, onChange: onEmailIdChange } = useInput();

  const [validationId, setValidationId] = useState(false);
  const [emailOption, setEmailOption] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const { message: idMessage, state: idState } = useValidate({
    value: id,
    type: 'id',
  });
  const { message: pwMessage, state: pwState } = useValidate({
    value: password,
    type: 'password',
  });
  const { message: pwCheckMessage, state: pwCheckState } = useValidate({
    value: check,
    type: 'passwordCheck',
    passwordCheck: password,
  });

  const onEmailOptionChange = (e: { target: { value: SetStateAction<string> } }) => {
    const selectedOption = e.target.value;
    setEmailOption(selectedOption);

    if (selectedOption === '직접 입력') {
      setEmailAddress('');
    } else {
      setEmailAddress(selectedOption);
    }
  };

  const isFormInvalid = (
    idState: 0 | 1 | 2,
    pwState: 0 | 1 | 2,
    pwCheckState: 0 | 1 | 2,
    nickname: string,
    emailId: string,
    emailAddress: string
  ): boolean => {
    const values = [idState, pwState, pwCheckState, nickname, emailId, emailAddress];
    return !(
      values.every((value) => value !== '') &&
      idState === 1 &&
      pwState === 1 &&
      pwCheckState === 1
    );
  };

  const onSubmit = async () => {
    const res = await RegisterApi({
      id,
      nickname,
      password,
      email: `${emailId}@${emailAddress}`,
    });

    if (res.status === 200) {
      console.log('회원가입 성공');
      navigate('/auth/signin');
    }
  };

  return (
    <div className="flex">
      <NavBar />
      <div className="w-full h-screen p-8">
        <div className="bg-white px-8 py-[10vh] rounded-xl">
          <div className="flex items-center justify-center">
            <div className="flex flex-col">
              <div>
                <div className="flex gap-x-4">
                  <input
                    value={id}
                    placeholder="아이디"
                    onChange={onIdChange}
                    disabled={validationId}
                    className="w-[17rem] px-3 py-3 text-xs bg-slate-50 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    className={`w-24 text-xs rounded-lg py-1 px-3 ${
                      id !== '' && validationId === false
                        ? 'bg-primary-default text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    onClick={async () => {
                      const result = await ValidIdApi(id);
                      console.log(result);
                      result.message == 'OK' ? setValidationId(true) : setValidationId(false);
                    }}
                  >
                    {validationId == true ? '확인완료' : '중복확인'}
                  </button>
                </div>
                <p
                  className={`text-[10px] mt-1 pl-1 ${
                    idState === 0
                      ? 'text-slate-400'
                      : idState === 1
                      ? 'text-blue-500'
                      : 'text-red-500'
                  }`}
                >
                  {idMessage}
                </p>
              </div>
              <div>
                <input
                  value={password}
                  placeholder="비밀번호"
                  type="password"
                  onChange={onPasswordChange}
                  className="w-96 px-3 py-3 mt-4 text-xs bg-slate-50 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p
                  className={`text-[10px] mt-1 pl-1 ${
                    pwState === 0
                      ? 'text-slate-400'
                      : idState === 1
                      ? 'text-blue-500'
                      : 'text-red-500'
                  }`}
                >
                  {pwMessage}
                </p>
              </div>
              <div>
                <input
                  value={check}
                  placeholder="비밀번호 확인"
                  type="password"
                  onChange={onCheckChange}
                  className="w-96 px-3 py-3 mt-4 text-xs bg-slate-50 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p
                  className={`text-[10px] mb-2 pl-2 ${
                    pwCheckState === 0
                      ? 'text-gray-500'
                      : idState === 1
                      ? 'text-blue-500'
                      : 'text-red-500'
                  }`}
                >
                  {pwCheckMessage}
                </p>
              </div>

              <div>
                <input
                  value={nickname}
                  placeholder="닉네임"
                  type="text"
                  onChange={onNameChange}
                  className="w-96 px-3 py-3 mt-4 text-xs bg-slate-50 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-3 mt-5">
                <input
                  className="w-3/5 px-3 py-3 text-xs bg-slate-50 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={emailId}
                  placeholder="이메일"
                  onChange={onEmailIdChange}
                />
                <p className="text-sm text-gray-400">@</p>
                {emailOption === '직접 입력' ? (
                  <input
                    className="w-full px-3 py-3 my-1 text-xs bg-slate-50 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={emailAddress}
                    autoFocus={true}
                    onChange={(e) => {
                      setEmailAddress(e.target.value);
                    }}
                  />
                ) : (
                  <select
                    className={`my-1 w-full px-3 py-3 text-xs bg-slate-50 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      emailOption === '' ? 'text-gray-400' : 'text-black'
                    }`}
                    value={emailOption}
                    onChange={onEmailOptionChange}
                  >
                    <option value="">선택</option>
                    <option value="ajou.ac.kr">ajou.ac.kr</option>
                    <option value="naver.com">naver.com</option>
                    <option value="kakao.com">kakao.com</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="hanmail.net">hanmail.net</option>
                    <option value="직접 입력">직접 입력</option>
                  </select>
                )}
              </div>
              <button
                className={`font-medium text-xs text-white py-2.5 px-4 mt-10 rounded-lg ${
                  isFormInvalid(idState, pwState, pwCheckState, nickname, emailId, emailAddress)
                    ? 'bg-gray-300'
                    : 'bg-primary-default hover:bg-opacity-80'
                }`}
                disabled={isFormInvalid(
                  idState,
                  pwState,
                  pwCheckState,
                  nickname,
                  emailId,
                  emailAddress
                )}
                onClick={() => {
                  onSubmit();
                  navigate('auth/login');
                }}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
