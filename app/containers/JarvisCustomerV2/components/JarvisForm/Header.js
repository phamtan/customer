/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import logo from 'images/logo-vp.svg';

const useStyles = makeStyles(theme => ({
  headerContainer: {
    width: '100%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerMenu: {
    width: '100%',
    maxWidth: '470px',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  loginContainer: {
    marginRight: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginIcon: {
    marginRight: '4px',
  },
}));

export default function Header(props) {
  const history = useHistory();
  const classes = useStyles();

  function gotoLogin() {
    history.push('/v2/login');
  }

  function gotoHome() {
    history.push('/v2');
  }

  return (
    <div className={classes.headerContainer}>
      <div className={classes.headerMenu}>
        <div className={props.className}>
          <img src={logo} alt="logo" onClick={() => gotoHome()} />
          <div className={classes.loginContainer} onClick={() => gotoLogin()}>
            <AccountCircleIcon className={classes.loginIcon} /> Đã đăng ký
          </div>
        </div>
      </div>
    </div>
  );
}
