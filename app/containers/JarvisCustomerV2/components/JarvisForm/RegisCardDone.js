import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import backGroundGreen from 'images/backgroundgreen.png';
import congrat from 'images/congrat.svg';
import JarvisFormStyle from './JarvisFormStyle';

const useStyles = makeStyles(theme => ({
  waitingCheckContainer: {
    backgroundImage: `url(${backGroundGreen})`,
    backgroundSize: 'contain',
    backgroundColor: 'white',
    width: '100%',
    maxWidth: '470px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      marginTop: '16px',
      marginBottom: '32px',
      borderRadius: '0px',
    },
  },
  waitingImg: {
    width: '100%',
    marginTop: '21px',
    paddingLeft: '32px',
    paddingRight: '32px',
    display: 'flex',
    justifyContent: 'center',
  },
  waitingTitle: {
    fontFamily: 'Roboto',
    fontSize: '24px',
    marginTop: '56px',
    lineHeight: '1.33',
    letterSpacing: '0.18px',
    color: 'white',
  },
  waitingText: {
    width: '90%',
    fontFamily: 'Roboto',
    fontSize: '16px',
    marginTop: '24px',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      marginBottom: '48px',
    },
  },
}));

export default function RegisCardDone() {
  const classes = useStyles();

  return (
    <JarvisFormStyle>
      <div className={classes.waitingCheckContainer}>
        <div className={classes.waitingTitle}>Xin cảm ơn quý khách</div>
        <div className={classes.waitingImg}>
          <img src={congrat} alt="logo" />
        </div>
        <div className={classes.waitingText}>
          <b>Thông tin đăng ký</b> của quý Khách đã <b>được tiếp nhận</b> bởi
          VPBank. Chúng tôi sẽ <b>thông báo cho bạn</b> khi có kết quả qua{' '}
          <b>tin nhắn/email</b> mà quý Khách đã đăng ký.
        </div>
      </div>
    </JarvisFormStyle>
  );
}
