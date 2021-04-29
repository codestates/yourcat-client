export default ({ value, type }) => {
  const errors = {};
  switch (type) {
    case 'email':
      if (!value) {
        errors.email = '이메일을 입력해주세요.';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        errors.email = '이메일을 확인해주세요.';
      }
      break;
    case 'password':
      if (
        !/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/.test(
          value,
        )
      ) {
        errors.password = '비밀번호를 확인해주세요.';
      }
      break;
    case 'signupNickname':
      if (!value) {
        errors.signupNickname = '이름을 입력해주세요';
      } else if (/^[$`~!@$!%#^?&\\(\\)+\\;\\:\\[\]\\<\\>\\/\\?]/.test(value)) {
        errors.signupNickname = '사용 불가능한 특수문자 입니다.';
      }
      break;
    case 'signupPassword':
      if (!value) {
        errors.signupPassword = '비밀번호를 입력해주세요.';
      } else if (value.length > 16 || value.length < 8) {
        errors.signupPassword = '8자 이상 16자 이하의 비밀번호를 입력해주세요';
      } else if (
        !/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/.test(
          value,
        )
      ) {
        errors.signupPassword =
          '적어도 1자 이상의 숫자, 영문, 특수문자가 필요합니다.';
      }
      break;
    case 'confirmPassword':
      if (!value.second) {
        errors.confirmPassword = '비밀번호를 입력해주세요.';
      } else if (value.first !== value.second) {
        errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      }
      break;
    default:
      break;
  }

  return errors;
};
