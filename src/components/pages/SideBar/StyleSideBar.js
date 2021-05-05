import React, { useEffect, useState, memo } from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
import { useSelector } from 'react-redux';
import Bars from '../LandingPage/Sections/Bars';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
const TEXT = styled.div`
  margin: 7px 10px;
`;

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

// TODO: 햄버거 눌렀을 때 right state를 true로
// 그러면 모든 페이지에서 state 변경이 되어야하는데 리덕스로 해야하나? 아니면 App.js에서??
function StyleSideBar() {
  const classes = useStyles();
  const resData = useSelector(state => {
    return state.getUserInfo;
  });
  console.log(resData);
  const [state, setState] = useState({ right: false });
  const [Info, setInfo] = useState('');
  console.log(Info);

  useEffect(() => {
    if (!resData.catInfo) {
      setInfo({
        catInfo: {
          name: 'Your Cat',
          age: '12',
          gender: 'Male',
          image: 'resData.catInfo.image',
        },
      });
    } else {
      setInfo(resData);
    }
  }, [state]);

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
        style={{ border: '1px solid', height: '250px', width: '250px' }}
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
        <ListItem button key="My Page">
          <TEXT> My Page </TEXT>
        </ListItem>
        <ListItem button key="Bookmark">
          <TEXT> Bookmark </TEXT>
        </ListItem>
        <ListItem button key="Logout">
          <TEXT> Logout </TEXT>
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
