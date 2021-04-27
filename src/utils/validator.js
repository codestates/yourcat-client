export default ({ value, type }) => {
  const errors = {};
  switch (type) {
    case 'email':
      if (type === 'email') {
        if (!value) {
          errors.email = '이메일이 입력되지 않앗습니다.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          errors.email = '입력된 이메일이 유효하지 않습니다.';
        }
      }
      break;

    case 'password':
      if (!value) {
        errors.password = '비밀번호가 입력되지 않았습니다.';
      } else if (value.length > 16 || value.length < 8) {
        errors.password = '8자 이상 16자 이하의 비밀번호를 입력해주세요';
      } else if (
        !/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/.test(
          value,
        )
      ) {
        errors.password =
          '적어도 1자 이상의 숫자, 영문, 특수문자가 필요합니다.';
      }
      break;
    default:
      break;
  }

  return errors;
};
