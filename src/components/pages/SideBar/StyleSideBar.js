import axios from 'axios';
import React, { useEffect, useState, memo } from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Bars from '../LandingPage/Sections/Bars';
import useCheckToken from '../../../utils/Hook/useCheckToken';

const TEXT = styled.div`
  margin: 7px 10px;
`;

const BUTTON = styled.div`
  margin: 7px 10px;
  &:hover {
    color: #badfdb;
    cursor: pointer;
  }
`;

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const Default = {
  nickname: '',
  email: '',
  catInfo: {},
};

function StyleSideBar() {
  const classes = useStyles();
  const resData =
    useSelector(state => {
      return state.getUserInfo;
    }) || Default;

  const [state, setState] = useState({ right: false });
  const [Info, setInfo] = useState(resData);
  const email = useSelector(({ getUserInfo }) => getUserInfo.email);
  const [{ result }, setResult] = useCheckToken();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!resData.catInfo.name) {
      setInfo({
        ...resData,
        catInfo: {
          name: 'Your Cat',
          age: 12,
          gender: 'Male',
          image:
            'https://testyourcat.s3.ap-northeast-2.amazonaws.com/images/1620144235807.png ',
        },
      });
    } else {
      setInfo(resData);
    }
  }, [resData]);

  const handleClick = () => {
    setResult();
    if (result.isAuth) {
      axios
        .post(
          'http://localhost:4000/users/logout',
          { email },
          { headers: { authorization: `Bearer ${result.accessToken}` } },
        )
        .then(() => {
          dispatch({ type: 'DELETE_TOKEN' });
          dispatch({ type: 'DELETE_USERINFO' });
          dispatch({ type: 'ERROR_MODAL_TRUE' });
          dispatch({
            type: 'SET_ERROR_MESSAGE',
            payload: '로그아웃이 완료 되었습니다.',
          });
          history.push('/');
        })
        .catch(() => {
          dispatch({ type: 'ERROR_MODAL_TRUE' });
          dispatch({
            type: 'SET_ERROR_MESSAGE',
            payload: '서버 요청에 실패했습니다.',
          });
        });
    }
  };

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <img
        style={{ height: '250px', width: '250px' }}
        src={Info && Info.catInfo.image}
        alt=""
      />
      <List>
        <ListItem key="Cat Name">
          <TEXT> Cat Name : {Info && Info.catInfo.name} </TEXT>
        </ListItem>
        <ListItem key="Cat Age">
          <TEXT> Cat Age : {Info && Info.catInfo.age} Months</TEXT>
        </ListItem>
        <ListItem key="Cat Gender">
          <TEXT> Cat Gender : {Info && Info.catInfo.gender}</TEXT>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <Link to="/mypage">
            <BUTTON> My Page </BUTTON>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/bookmarks">
            <BUTTON> Bookmark </BUTTON>
          </Link>
        </ListItem>
        <ListItem>
          <BUTTON onClick={handleClick}>Logout</BUTTON>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div style={{ width: '100px' }}>
      <div>
        {['right'].map(anchor => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>
              <Bars />
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default memo(StyleSideBar);
