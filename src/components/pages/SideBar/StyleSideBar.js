import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

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
export default function StyleSideBar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: true,
  });

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
      <div style={{ border: '1px solid', height: '250px' }}>Cat Image</div>

      <List>
        <ListItem key="Cat Name">
          <ListItemText primary="Cat Name : " />
        </ListItem>
        <ListItem key="Cat Age">
          <ListItemText primary="Cat Age : " />
        </ListItem>
        <ListItem key="Cat Gender">
          <ListItemText primary="Cat Gender : " />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="My Page">
          <ListItemText primary="My Page" />
        </ListItem>
        <ListItem button key="Bookmark">
          <ListItemText primary="Bookmark" />
        </ListItem>
        <ListItem button key="Logout">
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {['left', 'right', 'top', 'bottom'].map(anchor => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
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
  );
}
