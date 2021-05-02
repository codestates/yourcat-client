import { useState } from 'react'; // useEffect,
import { useSelector } from 'react-redux';

// --------------------------
// import useCheckToken from 'somewhere';
//
// const [{ result }, setResult] = useCheckToken();
// setResult();
// 실행시 result = token || false
// --------------------------
export default () => {
  const [data, setData] = useState({});
  const result = useSelector(dat => {
    return dat.login ? dat.login : false;
  });
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
