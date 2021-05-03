import { useEffect, useState } from 'react'; // useEffect,
import { useSelector } from 'react-redux';

// --------------------------
// import useCheckToken from 'somewhere';
//
// const [{ result }, setResult] = useCheckToken();
// setResult();
// 실행시 result = token || false
// --------------------------
export default () => {
  const result = useSelector(dat => {
    return dat.login ? dat.login : false;
  });
  const [data, setData] = useState({ result });
  useEffect(() => {
    setData({ result });
  }, [result]);
  const handler = () => {
    setData({ result });
  };

  return [data, handler];
};

// export default () => {
//   const [random, setRandom] = useState();
//   const [key, setKey] = useState({ default: '' });
//   const [data, setData] = useState();
//   const storeData = useSelector(dat => {
//     return dat[key[random]];
//   });
//   useEffect(() => {
//     setData({ ...storeData });
//   }, [random]);
//   const handler = val => {
//     const v = Math.random();
//     setKey({ [v]: val });
//     setRandom(v);
//   };
//   return [data, handler];
// };
