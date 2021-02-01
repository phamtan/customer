import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logoWhite from 'images/logowhite.svg';
import waitingcheck from 'images/waitingcheck.svg';

const useStyles = makeStyles(theme => ({
  waitingCheckContainer: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1598cc',
    alignItems: 'center',
    color: 'white',
  },
  logo: {
    width: '100%',
    display: 'flex',
    marginTop: '15px',
    marginLeft: '20px',
  },
  waitingImg: {
    width: '100%',
    marginTop: '180px',
    display: 'flex',
    justifyContent: 'center',
  },
  waitingTitle: {
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    fontSize: '24px',
    marginTop: '10px',
  },
  waitingText: {
    width: '90%',
    fontFamily: 'Roboto',
    fontSize: '13px',
    marginTop: '20px',
    textAlign: 'center',
  },
  root: {
    width: '100%',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
      display: 'none',
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    boxShadow: 'none',
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    fontSize: '13px',
  },
}));

export default function ConfirmDocument(props) {
  const classes = useStyles();

  function nextState() {
    props.setStep(999);
  }

  return (
    <div className={classes.waitingCheckContainer}>
      <div className={classes.logo}>
        <img src={logoWhite} alt="logo" />
      </div>{' '}
      <div className={classes.waitingImg}>
        <img src={waitingcheck} alt="logo" />
      </div>
      <div className={classes.waitingTitle}>Xin chúc mừng</div>
      <div className={classes.waitingText}>
        Bạn đã hoàn tất 5 bước mở thẻ với VPBank, hồ sơ của bạn đã được tiếp
        nhận bởi ngân hàng, chúng tôi sẽ thông báo cho bạn khi có kết quả qua
        <span onClick={() => nextState()}>tin nhắn và email.</span>
      </div>
    </div>
  );
}
